import { Request, Response } from 'express';
import { findCartItem, getCartItemsByUser, incrementCartItemQuantity, insertCartItem, updateCartItemQuantity, deleteCartItem } from '../models/cartModel';

const addToCart = async (req: Request, res: Response) => {
  try {
    const { itemId, size }: { itemId: number; size: string } = req.body;
    const userId = (req as any).userId;

    const existingItem = await findCartItem(userId, itemId, size);
    console.log(userId, itemId, size)

    if (existingItem) {
      await incrementCartItemQuantity(userId, itemId, size);
      return res.json({ message: 'Quantity updated.' });
    } else {
      await insertCartItem(userId, itemId, size);
      return res.json({ message: 'Item added to cart.' });
    }

  } catch (error) {
    console.error('Error in addToCart:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateCart = async (req: Request, res: Response) => {
  try {
    const { itemId, size, quantity }: { itemId: number; size: string; quantity: number } = req.body;
    const userId = (req as any).userId;

    const existingItem = await findCartItem(userId, itemId, size);

    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found in cart.' });
    }

    await updateCartItemQuantity(userId, itemId, size, quantity);

    return res.json({ message: 'Quantity updated successfully.' });

  } catch (error) {
    console.error('Error in updateCart:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserCart = async (req: Request, res: Response) => {
  try {
    console.log("req:", req)
    const userId = Number((req as Request & { userId: number }).userId);

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId parameter.' });
    }

    const cartItems = await getCartItemsByUser(userId);

    return res.json({ cartData: cartItems });

  } catch (error) {
    console.error('Error in getUserCart:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { itemId, size }: { itemId: number; size: string } = req.body;
    const userId = (req as any).userId; // postavljeno u auth middleware‑u

    // 1) Provjeri postoji li stavka
    const existingItem = await findCartItem(userId, itemId, size);

    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found in cart.' });
    }

    // 2) Obriši je
    await deleteCartItem(userId, itemId, size);

    return res.json({ message: 'Item removed from cart.' });
  } catch (error) {
    console.error('Error in removeFromCart:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { addToCart, updateCart, getUserCart, removeFromCart }

