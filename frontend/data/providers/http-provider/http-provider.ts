/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosHeaders, type AxiosRequestConfig } from "axios";
import type { ProviderInterface } from "../../provider-interface";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      if (config.headers) {
        if (config.headers instanceof AxiosHeaders) {
          config.headers.set("Authorization", `Bearer ${token}`);
        } else {
          config.headers["Authorization"] = `Bearer ${token}` as never;
        }
      } else {
        config.headers = new AxiosHeaders({
          Authorization: `Bearer ${token}`,
        });
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const httpProvider: ProviderInterface = {
  async get<T>(url: string, queryParams?: Record<string, any>) {
    const config: AxiosRequestConfig = { params: queryParams };
    const response = await axiosInstance.get<any>(url, config);
    return response.data;
  },

  async post<T>(url: string, body?: any, queryParams?: Record<string, any>) {
    const config: AxiosRequestConfig = { params: queryParams };
    const response = await axiosInstance.post<any>(url, body, config);
    return response.data;
  },

  async put<T>(url: string, body?: any, queryParams?: Record<string, any>) {
    const config: AxiosRequestConfig = { params: queryParams };
    const response = await axiosInstance.put<any>(url, body, config);
    return response.data;
  },

  async delete<T>(url: string, queryParams?: Record<string, any>) {
    const config: AxiosRequestConfig = { params: queryParams };
    const response = await axiosInstance.delete<any>(url, config);
    return response.data;
  },
};
