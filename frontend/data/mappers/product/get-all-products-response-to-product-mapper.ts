import type { Product } from "../../../models/Product";
import type { GetAllProductsResponse } from "../../../models/responses/get-all-products-response";

export function getAllProductsResponseToProductsMapper(response: GetAllProductsResponse) {
  return response.map((product) => {
    return {
      _id: product._id,
      image: product.image,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      subCategory: product.subCategory,
      sizes: product.sizes,
      bestseller: product.bestseller
    } as Product;
  });
}
