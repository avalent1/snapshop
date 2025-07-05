

import { Request, Response } from 'express';
import { createProductWithAssets } from '../services/productService';
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

    const imageFile = req.file as Express.Multer.File;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    // Ensure sizes is parsed as array (could be sent as JSON string)
    const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;

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
      imageFile
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

    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error fetching products.' });
  }
}

const removeProduct = async (req: Request, res: Response) => {

}

const singleProduct = async (req: Request, res: Response) => {

}

export { addProduct, listProducts, removeProduct, singleProduct }
