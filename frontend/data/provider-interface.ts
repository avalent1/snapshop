

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProviderInterface {
  get<T>(url: string, queryParams?: Record<string, any>): Promise<Response>;
  post<T>(
    url: string,
    body?: any,
    queryParams?: Record<string, any>
  ): Promise<Response>;
  put<T>(
    url: string,
    body?: any,
    queryParams?: Record<string, any>
  ): Promise<Response>;
  delete<T>(
    url: string,
    queryParams?: Record<string, any>
  ): Promise<Response>;
}
