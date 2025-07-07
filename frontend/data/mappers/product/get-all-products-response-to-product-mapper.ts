import type { Product } from "../../../models/Product";
import type { GetAllProductsResponse } from "../../../models/responses/get-all-products-response";

export function getAllProductsResponseToProductsMapper(response: GetAllProductsResponse) {
  return response.products.map((productResponse) => {
    return {
      id: productResponse.id,
      images: productResponse.images,
      name: productResponse.name,
      price: productResponse.price,
      description: productResponse.description,
      category: productResponse.category,
      subCategory: productResponse.subCategory,
      sizes: productResponse.sizes,
      bestseller: productResponse.bestseller
    } as Product;
  });
}
