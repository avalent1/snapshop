import { products } from "../../models/Product";

export type TitleProps = {
  text1: string;
  text2: string;
};

export type ProductProps = {
  _id: number;
  image: string;
  name: string;
  price: number;
};

export interface ShopContextType {
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: (value: string) => void;
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  cartItems: CartItem[];
  addToCart: (props: AddToCartProps) => Promise<void>;
  getCartCount: () => number;
  updateQuantity: (props: RemoveFromCartProps) => Promise<void>;
  removeFromCart: (props: RemoveFromCartProps) => Promise<void>;
  getCartAmount: () => number;
  navigate: (to: string) => void;
  token: string;
  setToken: (value: string) => void;
  backendUrl: string;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export interface RelatedProductsProps {
  category: string;
  subCategory: string;
}


export interface AddToCartProps {
  itemId: number;
  size: string;
}

export interface RemoveFromCartProps {
  itemId: number;
  size: string;
  quantity: number;
}

export type CartItem = any;

export interface CartDataProps {
  itemId: number;
  size: string;
  [size: string]: number;
}