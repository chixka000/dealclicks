import {
  AuthStoreProps,
  LoginPayloadProps,
} from "@/app/interfaces/auth/interface";
import { ChangeEvent, FormEvent } from "react";
import { create } from "zustand";
import AUTHAPI from "../api/admin/auth/request";

const useAuthStore = create<AuthStoreProps>((set, get) => ({
  data: {
    remember: false,
  },
  login: async () => {
    try {
      const payload = get().data;

      const response = await AUTHAPI.login(payload);

      return response;
    } catch (error) {
      throw error;
    }
  },
  onChangeHandler: (
    value: any,
    property: "email" | "password" | "remember"
  ) => {
    set({ data: { ...get().data, [property]: value } });
  },
}));

export default useAuthStore;
