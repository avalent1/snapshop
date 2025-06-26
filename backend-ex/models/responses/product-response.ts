export interface ProductResponse{
    _id: number;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    bestseller: boolean;
}