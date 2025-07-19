

import { Request, Response } from 'express';
import { createProductWithAssets, deleteProductById } from '../services/productService';
import { Product } from '../models/productModel';
import { ProductImage } from '../models/productImage';
import { ProductSize } from '../models/productSize';

const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      bestseller,
      sizes,
    } = req.body;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!files?.image1?.[0]) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    const uploadedImages = [files.image1?.[0], files.image2?.[0], files.image3?.[0]].filter(Boolean);
    // Ensure sizes is parsed as array (could be sent as JSON string)
    const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;

    if (!parsedSizes || !Array.isArray(parsedSizes) || parsedSizes.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one size is required.' });
    }
    
    const result = await createProductWithAssets(
      {
        name,
        description,
        price: parseFloat(price),
        category,
        subCategory,
        bestseller: bestseller === 'true' || bestseller === true,
        sizes: parsedSizes,
      },
      uploadedImages
    );

    res.status(201).json({
      success: true,
      productId: result.id,
      message: 'Product created successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Product creation failed' });
  }
};

const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: ProductImage, as: 'images' },
        { model: ProductSize, as: 'sizes' },
      ],
    });

    res.json({success: true, products});
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error fetching products.' });
  }
}

const removeProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.body.id); // or req.params.id if you prefer
    if (!productId || isNaN(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    await deleteProductById(productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
}

const singleProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.body.id); // or req.params.id if you want to pass id in URL

    if (!productId || isNaN(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findByPk(productId, {
      include: [
        { model: ProductImage, as: 'images' },
        { model: ProductSize, as: 'sizes' },
      ],
    });

    if (!product) {
      return res.status(404);
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error fetching product' });
  }
}

export { addProduct, listProducts, removeProduct, singleProduct }
