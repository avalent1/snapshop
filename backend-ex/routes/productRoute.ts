import express from 'express';
import multer from 'multer';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController';
import  adminAuth from '../middleware/adminAuth'

const productRouter = express.Router();

// Multer setup
const upload = multer({ dest: 'uploads/' }); // temporary folder for image uploads

// Helper to wrap async route handlers and forward errors to Express error handler
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
	Promise.resolve(fn(req, res, next)).catch(next);

// Use upload.single('image') for image upload field
productRouter.post('/add', asyncHandler(adminAuth), upload.single('image'), asyncHandler(addProduct));
productRouter.post('/remove', asyncHandler(removeProduct));
productRouter.post('/single', asyncHandler(singleProduct));
productRouter.get('/list', listProducts);
export default productRouter;
