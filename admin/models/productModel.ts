export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: Image[];
    category: string;
    subCategory: string;
    sizes: string[];
    bestseller: boolean;
}

interface Image {
  createdAt: string;
  id: number;
  productId: number;
  publicId: string;
  updatedAt: string;
  url: string;
}