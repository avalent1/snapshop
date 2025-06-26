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
}
