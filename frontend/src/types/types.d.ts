import { products } from "../../../backend-ex/models/Product";

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
    cartItems: Record<number, CartItem>;
    addToCart: (props: AddToCartProps) => Promise<void>;
    getCartCount: () => number;
    updateQuantity: (props: RemoveFromCartProps) => Promise<void>;
    getCartAmount: () => number;
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
  quantity:number;
}

export type CartItem = {
        [size: string]: number;
    };

export interface CartDataProps {
  itemId: number;
  size: string;
  [size: string]: number;
}