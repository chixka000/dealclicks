import { SchemaField } from "@/app/backend/shared/interfaces/validator";

export interface IAuthValidator {
  email: SchemaField;
  password: SchemaField;
  remember: SchemaField;
}
