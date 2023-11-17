import { Document, Model } from "mongoose";
import { IUser } from "../../user/interfaces";

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

export type DataType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "object"
  | "enum";

export interface IRulePayload {
  method: RuleMethod;
  model?: Model<Document & any>;
  where?: object;
  whereNot?: object;
  size?: number;
}

export interface IRuleQueryParameters {
  value: any;
  model?: Model<Document & any>;
  property: string;
  where?: object;
  whereNot?: object;
  size?: number;
}

export interface IRuleValueParameter {
  value: any;
}

export interface IRuleLengthParameter extends IRuleValueParameter {
  property: string;
  size?: number;
}
export interface IValidator {
  required?: boolean;
  rules?: Array<{
    method: RuleMethod;
    value?: any;
    model?: string;
    property?: any;
    where?: any;
    whereNot?: any;
    size?: number;
  }>;
  minLength?: Number;
  maxLength?: Number;
  type: VariableType;
  children?: any;
}

export interface IRuleResponse {
  error: boolean;
  type?: string;
  message?: string;
}

export interface SchemaField {
  required: boolean;
  type?: DataType;
  enu?: Array<string>;
  trim?: boolean;
  rules?: Array<IRulePayload>;
  member?: SchemaField;
  members?: { [key: string]: SchemaField };
}

export interface ISchemaParameters {
  rules?: Array<IRulePayload>;
}

export interface ISchemaStringParameters extends ISchemaParameters {
  trim?: boolean;
}

export interface ISchemaArrayAndObjectParameters extends ISchemaParameters {
  members?: { [key: string]: SchemaField };
  member?: SchemaField;
}

// export interface ISchemaObjectParameters extends ISchemaParameters {
//   member?: { [key: string]: SchemaField };
// }

export interface ISchema {
  String(parameters?: ISchemaStringParameters): SchemaField;
  StringOptional(parameters?: ISchemaStringParameters): SchemaField;
  Number(parameters?: ISchemaParameters): SchemaField;
  NumberOptional(parameters?: ISchemaParameters): SchemaField;
  Boolean(parameters?: ISchemaParameters): SchemaField;
  BooleanOptional(parameters?: ISchemaParameters): SchemaField;
  Enum(enu: Array<string>, parameters?: ISchemaParameters): SchemaField;
  EnumOptional(enu: Array<string>, parameters?: ISchemaParameters): SchemaField;
  Object(parameters?: ISchemaArrayAndObjectParameters): SchemaField;
  ObjectOptional(parameters?: ISchemaArrayAndObjectParameters): SchemaField;
  Array(parameters?: ISchemaArrayAndObjectParameters): SchemaField;
  ArrayOptional(parameters?: ISchemaArrayAndObjectParameters): SchemaField;
}

export interface IValidatorResponse {
  errors: {
    [key: string]: IRuleResponse;
  }[];
  data: any;
  user: IUser;
}
