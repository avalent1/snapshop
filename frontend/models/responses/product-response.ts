import { Image, Sizes } from "../Product";

export interface ProductResponse{
    success: boolean;
    products: {
    id: number;
    name: string;
    description: string;
    price: number;
    images: Image[];
    category: string;
    subCategory: string;
    sizes: Sizes[];
    bestseller: boolean;
    }[]
}