import { products } from "../assets/assets";

export type TitleProps = {
  text1: string;
  text2: string;
};

export type ProductProps = {
  _id: string;
  image: string[];
  name: string;
  price: number; 
};

export interface ShopContextType {
    products: typeof products;
    currency: string;
    delivery_fee: number;
}


//tretira ekstenziju kao string