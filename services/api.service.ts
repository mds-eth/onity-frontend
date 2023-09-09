/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { parseCookies } from "nookies";
import { decryptData } from "../utils/Utils";

class ApiService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BACKEND,
    });

    this.setupInterceptors();
  }

  private async setupInterceptors() {
    const cookies = parseCookies();

    const token = cookies["[@auth:user]"]
      ? await decryptData(JSON.parse(cookies["[@auth:user]"]))
      : false;

    this.axiosInstance.interceptors.request.use((config) => {
      if (token.access_token) {
        config.headers.Authorization = `${token.access_token}`;
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

  async postWithFile<T>(
    url: string,
    data?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<AxiosResponse<T>> {
    const defaultHeaders = {
      "Content-Type": "multipart/form-data",
      ...headers,
    };

    return await this.axiosInstance.post<T>(url, data, {
      headers: defaultHeaders,
    });
  }

  async putWithFile<T>(
    url: string,
    data?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<AxiosResponse<T>> {
    const defaultHeaders = {
      "Content-Type": "multipart/form-data",
      ...headers,
    };

    return await this.axiosInstance.put<T>(url, data, {
      headers: defaultHeaders,
    });
  }

  async delete<T>(url: string, headers?: Record<string, any>) {
    return await this.axiosInstance.delete<T>(url, { headers });
  }
}

export default new ApiService();
