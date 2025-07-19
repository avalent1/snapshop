import express from 'express'
import { addToCart, getUserCart, updateCart, removeFromCart } from '../controllers/cartController'
import {authUser, authUser1} from '../middleware/auth';

const cartRouter = express.Router()

const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

cartRouter.post('/get', asyncHandler(authUser1), asyncHandler(getUserCart))
cartRouter.post('/add', asyncHandler(authUser), asyncHandler(addToCart))
cartRouter.post('/update', asyncHandler(authUser), asyncHandler(updateCart))
cartRouter.delete('/remove', asyncHandler(authUser), asyncHandler(removeFromCart))

export default cartRouter