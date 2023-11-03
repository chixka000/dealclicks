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

export type RuleMethod =
  | "email"
  | "password"
  | "unique"
  | "exists"
  | "minLength"
  | "maxLength";

export interface IRulePayload {
  value?: any;
  model?: any;
  property?: any;
  where?: object;
  whereNot?: object;
  size?: number;
}
export interface IValidator {
  required?: boolean;
  rules?: Array<{
    method: RuleMethod;
    value?: any;
    model?: any;
    property?: any;
    where?: any;
    whereNot?: any;
    size?: number;
  }>;
  minLength?: Number;
  maxLength?: Number;
  type: VariableType;
}

export interface IRuleResponse {
  error: boolean;
  type?: string;
  message?: string;
}
