import { SchemaField } from "../shared/interfaces/validator";

export interface IAuthValidator {
  email: SchemaField;
  password: SchemaField;
  remember: SchemaField;
}
