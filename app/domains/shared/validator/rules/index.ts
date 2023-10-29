import { Document, Model } from "mongoose";
import { IRuleResponse, RuleMethod } from "../../../../interfaces";
import { email, password, unique } from "./rules";

export async function Rules<T extends Document>(
  method: RuleMethod,
  value: any,
  model: Model<T>,
  property: any,
  where?: any,
  whereNot?: any
) {
  try {
    let result: IRuleResponse | Promise<IRuleResponse> = { error: false };
    switch (method) {
      case "email":
        result = email(value);
        break;
      case "password":
        result = password(value);
        break;
      case "unique":
        result = await unique(value, model, property, where, whereNot);
      default:
        break;
    }

    return result;
  } catch (error: any) {}
}
