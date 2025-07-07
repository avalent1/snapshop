import type { Response } from "../models/response";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProviderInterface {
  get<T>(url: string, queryParams?: Record<string, any>): Promise<Response<T>>;
  post<T>(
    url: string,
    body?: any,
    queryParams?: Record<string, any>
  ): Promise<Response<T>>;
  put<T>(
    url: string,
    body?: any,
    queryParams?: Record<string, any>
  ): Promise<Response<T>>;
  delete<T>(
    url: string,
    queryParams?: Record<string, any>
  ): Promise<Response<T>>;
}
