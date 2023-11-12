import {
  ISchemaParameters,
  ISchema,
  ISchemaStringParameters,
  ISchemaArrayAndObjectParameters,
} from "../../interfaces/validator";

const Schema: ISchema = {
  String(parameters: ISchemaStringParameters) {
    return { type: "string", required: true, ...parameters };
  },
  StringOptional(parameters: ISchemaStringParameters) {
    return { type: "string", required: false, ...parameters };
  },
  Number(parameters: ISchemaParameters) {
    return { type: "number", required: true, ...parameters };
  },
  NumberOptional(parameters: ISchemaParameters) {
    return { type: "number", required: false, ...parameters };
  },
  Boolean(parameters: ISchemaParameters) {
    return { type: "boolean", required: true, ...parameters };
  },
  BooleanOptional(parameters: ISchemaParameters) {
    return { type: "boolean", required: false, ...parameters };
  },
  Enum(enu: Array<string>, parameters: ISchemaParameters) {
    return { type: "enum", required: true, enu, ...parameters };
  },
  EnumOptional(enu: Array<string>, parameters: ISchemaParameters) {
    return { type: "enum", required: false, enu, ...parameters };
  },
  Object(parameters: ISchemaArrayAndObjectParameters) {
    return {
      type: "object",
      required: true,
      ...parameters,
    };
  },
  ObjectOptional(parameters: ISchemaArrayAndObjectParameters) {
    return {
      type: "object",
      required: false,
      ...parameters,
    };
  },
  Array(parameters: ISchemaArrayAndObjectParameters) {
    return {
      type: "array",
      required: true,
      ...parameters,
    };
  },
  ArrayOptional(parameters: ISchemaArrayAndObjectParameters) {
    return {
      type: "array",
      required: false,
      ...parameters,
    };
  },
};

export { Schema };
