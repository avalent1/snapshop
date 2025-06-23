import type { Response } from "../../../../models/response";
import type { GetAllProductsResponse } from "../../../../models/responses/get-all-products-response";

export const getAllProductsMock = {
  errorCode: 0,
  errorMessage: "",
  response: [
    {
      _id: 1,
      image: ["https://res.cloudinary.com/dq9demmal/image/upload/v1750613835/astra_owodgf.jpg"],
      name: "Product 1",
      price: 100,
      description: "Description for Product 1",
      category: "Category 1",
      subCategory: "SubCategory 1",
      sizes: ["S", "M", "L"],
      bestseller: true,
    },
  ],
} as Response<GetAllProductsResponse>;