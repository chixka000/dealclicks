import { LoginPayloadProps } from "@/app/interfaces/auth/interface";
import BaseAPI from "../_base.api";

export default class AUTHAPI {
  static async login(payload: LoginPayloadProps) {
    try {
      const response = await BaseAPI.post("/api/users/login", payload);

      return response;
    } catch (error: any) {
      throw error;
    }
  }

  static meSWR(params = "", options = {}) {
    const url = "/api/users/me" + params;

    return BaseAPI.swr(url, options);
  }
}
