import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController'
import authUser from '../middleware/auth';

const cartRouter = express.Router()

const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

cartRouter.post('/get', asyncHandler(authUser), asyncHandler(getUserCart))
cartRouter.post('/add', asyncHandler(authUser), asyncHandler(addToCart))
cartRouter.post('/update', asyncHandler(authUser), asyncHandler(updateCart))

export default cartRouter