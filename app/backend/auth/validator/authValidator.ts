import { Schema } from "@/app/backend/shared/validator";
import { IAuthValidator } from "@/app/backend/auth/interfaces";

export function authValidator(): any {
  const schema: IAuthValidator = {
    email: Schema.String({ trim: true, rules: [{ method: "email" }] }),
    password: Schema.String(),
    remember: Schema.BooleanOptional(),
  };

  const message: any = {};

  return { schema, message };
}
