/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig } from "axios";
import type { ProviderInterface } from "../../provider-interface";
import type { Response } from "../../../models/response";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 1000,
});

export const httpProvider: ProviderInterface = {
  async get<T>(url: string, queryParams?: Record<string, any>) {
    const config: AxiosRequestConfig = { params: queryParams };
    const response = await axiosInstance.get<Response<T>>(url, config);
    return response.data;
  },

  async post<T>(url: string, body?: any, queryParams?: Record<string, any>) {
    const config: AxiosRequestConfig = { params: queryParams };
    const response = await axiosInstance.post<Response<T>>(url, body, config);
    return response.data;
  },

  async put<T>(url: string, body?: any, queryParams?: Record<string, any>) {
    const config: AxiosRequestConfig = { params: queryParams };
    const response = await axiosInstance.put<Response<T>>(url, body, config);
    return response.data;
  },

  async delete<T>(url: string, queryParams?: Record<string, any>) {
    const config: AxiosRequestConfig = { params: queryParams };
    const response = await axiosInstance.delete<Response<T>>(url, config);
    return response.data;
  },
};
