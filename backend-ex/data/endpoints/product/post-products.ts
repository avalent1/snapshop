import type { PostResponse } from "../../../models/PostResponse";
import type { PostProductRequest } from "../../../models/requests/post-product-request";
import type { PostProductResponse } from "../../../models/responses/post-product-response";
import { postProductsResponseToPostResponse } from "../../mappers/product/post-product-response-to-post-response";
import { genericResponseMapper } from "../../mappers/generic-response-mapper";
import { provider } from "../../providers/provider";

export async function postCar(request: PostProductRequest): Promise<PostResponse> {
  const response = await provider.post<PostProductResponse>("PostCar", {
    ...request,
  });
  return postProductsResponseToPostResponse(genericResponseMapper(response));
}
