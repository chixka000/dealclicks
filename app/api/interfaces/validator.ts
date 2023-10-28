import { Document, Model } from "mongoose";

type VariableType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "null"
  | "undefined"
  | "function"
  | "symbol"
  | "bigint";

export type RuleMethod = "email" | "password" | "unique";

export interface IValidator {
  required?: boolean;
  rules?: Array<{
    method: RuleMethod;
    value?: any;
    model?: any;
    property?: any;
    where?: any;
    whereNot?: any;
  }>;
  minLength?: Number;
  maxLength?: Number;
  type: VariableType;
}
export interface IAuthValidator {
  email: IValidator;
  password: IValidator;
  remember: IValidator;
}

export interface IStoreValidator {
  store_name: IValidator;
  description?: IValidator;
}

export interface IRuleResponse {
  error: boolean;
  type?: string;
  message?: string;
}
