import type { Response } from "../../../../models/response";
import type { PostProductResponse } from "../../../../models/responses/post-product-response";

export const postProductMock = {
  errorCode: 0,
  errorMessage: "",
  response: true,
} as Response<PostProductResponse>;