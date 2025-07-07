import type { GetAllProductsRequest } from "../../../models/requests/get-all-products-request";
import type { GetAllProductsResponse } from "../../../models/responses/get-all-products-response";
import { getAllProductsResponseToProductsMapper } from "../../mappers/product/get-all-products-response-to-product-mapper";
import { genericResponseMapper } from "../../mappers/generic-response-mapper";
import { provider } from "../../providers/provider";

export async function getAllProducts(request: GetAllProductsRequest) {
  const responseData = await provider.get<GetAllProductsResponse>("/product/list");
  console.log(responseData)
  return getAllProductsResponseToProductsMapper(genericResponseMapper<GetAllProductsResponse>(responseData));
}
