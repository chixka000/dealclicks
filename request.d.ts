import { NextRequest as OriginalNextRequest } from "next/server";
import { IValidatorResponse, SchemaField } from "./app/backend/shared/interfaces/validator";
import { IUser } from "./app/backend/user/interfaces";

declare global {
  declare interface NextRequest extends OriginalNextRequest {
    validate(): Promise<{ schema: { [key: string]: SchemaField }; message: any }> 
    user: IUser;
  }
}
