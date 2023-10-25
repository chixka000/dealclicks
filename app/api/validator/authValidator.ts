import { NextResponse } from "next/server";
import { IAuthValidator } from "../interfaces/validator";
import { email } from "./rules/rules";
import { validate } from "./validate";

const schema: IAuthValidator = {
  email: {
    required: true,
    rules: [email],
  },
  password: {
    required: true,
  },
};

const message: any = {};

export function authValidator(): any {
  return { schema, message };
}
