import axios, { AxiosError, AxiosInstance } from "axios";
// const urlApi = "http://sv.optechdemo.com:3002/api";
// const urlImage = "http://sv.optechdemo.com:3002/uploads";
const urlApi = "https://yowork.optech.vn:3002/api";
const urlImage = "https://yowork.optech.vn:3002/uploads";

const verApi = "v1";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: `${urlApi}/${verApi}`,
      timeout: 0,
      headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    this.instance.interceptors.request.use(
      async (config) => {
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export { urlImage, http };
