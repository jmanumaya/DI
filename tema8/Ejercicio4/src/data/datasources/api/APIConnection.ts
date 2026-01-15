import axios, { AxiosInstance } from "axios";

export class APIConnection {
  private static instance: AxiosInstance;
  private static readonly BASE_URL =
    "https://josemanuel-cxevfcgaewgadebz.spaincentral-01.azurewebsites.net/api";

  static getInstance(): AxiosInstance {
    if (!APIConnection.instance) {
      APIConnection.instance = axios.create({
        baseURL: APIConnection.BASE_URL,
        timeout: 10000,
      });
    }
    return APIConnection.instance;
  }
}
