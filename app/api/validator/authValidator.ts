import { IAuthValidator } from "../interfaces/validator";
import { email, password } from "./rules/rules";

export function authValidator(): any {
  const schema: IAuthValidator = {
    email: {
      required: true,
      rules: [email],
    },
    password: {
      required: true,
    },
    remember: {
      required: false
    }
  };

  const message: any = {};

  return { schema, message };
}
