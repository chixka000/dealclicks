import { IAuthValidator } from "../interfaces";

export function authValidator(): any {
  const schema: IAuthValidator = {
    email: {
      type: "string",
      required: true,
      rules: [{ method: "email" }],
    },
    password: {
      type: "string",
      required: true,
    },
    remember: {
      type: "boolean",
      required: false,
    },
  };

  const message: any = {};

  return { schema, message };
}
