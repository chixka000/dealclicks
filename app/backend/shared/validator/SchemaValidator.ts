import { NextRequest } from "next/server";
import { SchemaField } from "../interfaces/validator";
import { validatorHandler } from "./rules/validation";
import { IUser } from "../../user/interfaces";

export default class SchemaValidator {
  async validate(
    request: NextRequest,
    // this: NextRequest,
    validator: any,
    params?: { id: string }
  ) {
    const data = await request.json();

    const properties: {
      schema: { [key: string]: SchemaField };
      message: { [key: string]: { [key: string]: string } };
      user: IUser;
    } = await validator(request, data, params);

    const errors = await validatorHandler(
      data,
      properties.schema,
      properties.message
    );

    return { errors, data, user: properties.user };
  }
}
