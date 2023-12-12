import { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent } from "react";
import { IUser } from "../../backend/user/interfaces";

export interface LoginPayloadProps {
  email?: string;
  password?: string;
  remember?: boolean;
}

export interface AuthStoreProps {
  data: LoginPayloadProps;
  login: () => Promise<AxiosResponse<any, any>>;
  onChangeHandler: (
    value: any,
    property: "email" | "password" | "remember"
  ) => void;
}
