import { Transaction } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import '../config/cloudinary';
import sequelize from '../config/database';
import { Product } from '../models/productModel';
import { ProductImage } from '../models/productImage';
import { ProductSize } from '../models/productSize';

interface NewProductDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  bestseller: boolean;
  sizes: string[];
}

export async function createProductWithAssets(
  data: NewProductDTO,
  imageFiles: Express.Multer.File[] // updated to accept multiple files
) {
  return await sequelize.transaction(async (tx: Transaction) => {
    // 1. Create Product first
    const product = await Product.create(
      {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        subCategory: data.subCategory,
        bestseller: data.bestseller,
      },
      { transaction: tx }
    );

    // 2. Upload images to Cloudinary and save in DB
    for (const file of imageFiles) {
      const uploadRes = await cloudinary.uploader.upload(file.path, {
        folder: 'products',
      });

      await ProductImage.create(
        {
          url: uploadRes.secure_url,
          publicId: uploadRes.public_id,
          productId: product.id,
        },
        { transaction: tx }
      );
    }

    // 3. Create Sizes (if any)
    if (data.sizes && data.sizes.length > 0) {
      const sizeRecords = data.sizes.map((size) => ({
        productId: product.id,
        size,
      }));
      await ProductSize.bulkCreate(sizeRecords, { transaction: tx });
    }

    return product;
  });
}


export async function deleteProductById(productId: number): Promise<void> {
  await sequelize.transaction(async (tx) => {
    // 1. Find product with associated images (for Cloudinary deletion)
    const product = await Product.findByPk(productId, {
      include: [{ model: ProductImage, as: 'images' }],
      transaction: tx,
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // 2. Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.publicId) {
          await cloudinary.uploader.destroy(img.publicId);
        }
      }
    }

    // 3. Delete associated ProductImages and ProductSizes
    await ProductImage.destroy({ where: { productId }, transaction: tx });
    await ProductSize.destroy({ where: { productId }, transaction: tx });

    // 4. Delete the product itself
    await Product.destroy({ where: { id: productId }, transaction: tx });
  });
}