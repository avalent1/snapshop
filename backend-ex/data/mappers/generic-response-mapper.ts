import type { Response } from "../../models/response";

export function genericResponseMapper<T>(response: Response<T>): T {
  if (response.errorCode > 0) {
    throw new Error("Fetch Error: " + response.errorMessage);
  }
  return response.response;
}
