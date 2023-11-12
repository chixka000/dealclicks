import { NextRequest as OriginalNextRequest } from "next/server";
import { IValidatorResponse } from "./app/backend/shared/interfaces/validator";

export interface CustomContext {
  validate(validator: Function): Promise<IValidatorResponse>;
  name: string;
  // Add other properties if needed
}

declare global {
  declare interface NextRequest extends OriginalNextRequest {
    context: CustomContext;
  }
}
