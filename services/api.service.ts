/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

class ApiService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BACKEND,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use((config) => {
      const cookies = parseCookies();

      if (cookies["@token-client"]) {
        config.headers.Authorization = `${cookies["@token-client"]}`;
      }

      return config;
    });
  }

  async get<T>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, any>
  ) {
    return await this.axiosInstance.get<T>(url, { params, headers });
  }

  async post<T>(
    url: string,
    data?: Record<string, any>,
    headers?: Record<string, any>
  ) {
    return await this.axiosInstance.post<T>(url, data, { headers });
  }

  async put<T>(
    url: string,
    data?: Record<string, any>,
    headers?: Record<string, any>
  ) {
    return await this.axiosInstance.put<T>(url, data, { headers });
  }

  async delete<T>(url: string, headers?: Record<string, any>) {
    return await this.axiosInstance.delete<T>(url, { headers });
  }
}

export default new ApiService();
