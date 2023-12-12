import axios from "axios";
import { setupInterceptorsTo } from "./intercepter";
import UseSWR from "swr";
setupInterceptorsTo(axios);

const defaultConfig = {
  headers: {
    "content-type": "application/json",
  },
};

export default class BaseAPI {
  static async get(URL: string, config: any = defaultConfig) {
    return await axios.get(URL, config);
  }

  static async post(URL: string, data: any, config: any = defaultConfig) {
    return await axios.post(URL, data, config).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  static async put(URL: string, data: any, config: any = defaultConfig) {
    return await axios.put(URL, data, config).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  static async patch(URL: string, data: any, config: any = defaultConfig) {
    return await axios.patch(URL, data, config).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  static async delete(
    URL: string,
    config: { [key: string]: any } = defaultConfig
  ) {
    return await axios.delete(URL, config).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  static swr(URL: string, options: { [key: string]: any } = {}) {
    const fetcher = (link: string) => this.get(link);

    const render = options.hasOwnProperty("render") ? options.render : true;

    const { data, mutate, isValidating, error } = UseSWR(
      render ? URL : null,
      fetcher,
      options
    );

    return {
      data: data ? data.data : data,
      mutate,
      isValidating,
      error,
    };
  }
}
