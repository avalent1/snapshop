export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: Image[];
    category: string;
    subCategory: string;
    sizes: Sizes[];
    bestseller: boolean;
}

export interface Image {
  createdAt: string;
  id: number;
  productId: number;
  publicId: string;
  updatedAt: string;
  url: string;
}

export interface Sizes {
    id: number;
    productId: number;
    size: string;
    createdAt: string;
    updatedAt: string;
}