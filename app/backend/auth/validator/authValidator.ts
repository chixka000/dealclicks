import { Schema } from "../../shared/validator";
import { IAuthValidator } from "../interfaces";

export function authValidator(): any {
  const schema: IAuthValidator = {
    email: Schema.String({ trim: true, rules: [{ method: "email" }] }),
    password: Schema.String(),
    remember: Schema.BooleanOptional(),
  };

  const message: any = {};

  return { schema, message };
}
