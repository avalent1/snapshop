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
  imageFile: Express.Multer.File
) {
  return await sequelize.transaction(async (tx: Transaction) => {
    // 1. Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(imageFile.path, { folder: 'products' });

    // 2. Create Product
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

    // 3. Create ProductImage
    await ProductImage.create(
      {
        url: uploadRes.secure_url,
        publicId: uploadRes.public_id,
        productId: product.id,
      },
      { transaction: tx }
    );

    // 4. Create Sizes (if any)
    if (data.sizes && data.sizes.length) {
      const sizeRecords = data.sizes.map((size) => ({ productId: product.id, size }));
      await ProductSize.bulkCreate(sizeRecords, { transaction: tx });
    }

    return product;
  });
}