/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Response } from "../../../models/response";
import type { ProviderInterface } from "../../provider-interface";
import { getAllProductsMock } from "./mock-data/get-all-products-mock";
import { postProductMock } from "./mock-data/post-products-mock";

type StoreData = {
  [endpoint: string]: Response<any>;
};

const store: StoreData = {
  GetAllProducts: getAllProductsMock,
  PostProduct: postProductMock,
};

function simulateNetworkDelay<T>(
  response: Response<T>,
  delay = 200
): Promise<Response<T>> {
  return new Promise((resolve) => setTimeout(() => resolve(response), delay));
}

function logRequest(
  method: string,
  url: string,
  details?: any,
  response?: any
) {
  console.log(`[MOCK ${method}] ${url}`, {
    details,
    response,
  });
}

export const mockProvider: ProviderInterface = {
  async get<T>(url: string, queryParams?: Record<string, any>) {
    const data = store[url] as Response<T>;
    if (data === undefined) {
      throw new Error(`GET: No data found for url: ${url}`);
    }
    logRequest("GET", url, queryParams, data);
    return simulateNetworkDelay(data);
  },

  async post<T>(
    url: string,
    body?: Record<string, any>,
    queryParams?: Record<string, any>
  ) {
    const data = store[url] as Response<T>;
    if (data === undefined) {
      throw new Error(`POST: No data found for url: ${url}`);
    }
    logRequest("POST", url, { ...body, ...queryParams }, data);
    return simulateNetworkDelay(data);
  },

  async put<T>(
    url: string,
    body?: Record<string, any>,
    queryParams?: Record<string, any>
  ) {
    const data = store[url] as Response<T>;
    if (data === undefined) {
      throw new Error(`PUT: No data found for url: ${url}`);
    }
    logRequest("PUT", url, { ...body, ...queryParams }, data);
    return simulateNetworkDelay(data);
  },

  async delete<T>(url: string, queryParams?: Record<string, any>) {
    const data = store[url] as Response<T>;
    if (data === undefined) {
      throw new Error(`DELETE: No data found for url: ${url}`);
    }
    logRequest("DELETE", url, queryParams, data);
    return simulateNetworkDelay(data);
  },
};
