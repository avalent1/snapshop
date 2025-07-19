import sequelize from '../config/database'; 
import { QueryTypes } from 'sequelize';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}
export interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  size: string;
  quantity: number;
}

export const findCartItem = async (userId: number, productId: number, size: string): Promise<Cart | null> => {
  const items = await sequelize.query<Cart>(
    `SELECT * FROM cart_items WHERE user_id = :userId AND product_id = :productId AND size = :size`,
    {
      replacements: { userId, productId, size },
      type: QueryTypes.SELECT,
    }
  );

  return items[0] || null;
};

export const incrementCartItemQuantity = async (userId: number, productId: number, size: string): Promise<void> => {
  await sequelize.query(
    `UPDATE cart_items 
     SET quantity = quantity + 1 
     WHERE user_id = :userId AND product_id = :productId AND size = :size`,
    {
      replacements: { userId, productId, size },
      type: QueryTypes.UPDATE,
    }
  );
};

export const insertCartItem = async (userId: number, productId: number, size: string): Promise<void> => {
  await sequelize.query(
    `INSERT INTO cart_items (user_id, product_id, size, quantity)
     VALUES (:userId, :productId, :size, 1)`,
    {
      replacements: { userId, productId, size },
      type: QueryTypes.INSERT,
    }
  );
};

export const updateCartItemQuantity = async (
  userId: number,
  productId: number,
  size: string,
  quantity: number
): Promise<void> => {
  await sequelize.query(
    `UPDATE cart_items
     SET quantity = :quantity
     WHERE user_id = :userId AND product_id = :productId AND size = :size`,
    {
      replacements: { userId, productId, size, quantity },
      type: QueryTypes.UPDATE,
    }
  );
};

export const getCartItemsByUser = async (userId: number): Promise<Cart[]> => {
  return await sequelize.query<Cart>(
    `select ci.id as id, ci.user_id as userId, ci.product_id as productId, ci.size, ci.quantity, p.price from cart_items ci join products p on ci.product_id=p.id where ci.user_id=:userId`,
    {
      replacements: { userId },
      type: QueryTypes.SELECT,
    }
  );
};

export const deleteCartItem = async (
  userId: number,
  productId: number,
  size: string
): Promise<void> => {
  await sequelize.query(
    `DELETE FROM cart_items
     WHERE user_id = :userId AND product_id = :productId AND size = :size`,
    {
      replacements: { userId, productId, size },
      type: QueryTypes.DELETE,   // koristi odgovarajući QueryType
    }
  );
};