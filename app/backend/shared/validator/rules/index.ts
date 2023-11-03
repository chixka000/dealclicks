import { Document } from "mongoose";
import {
  emailRule,
  existsRule,
  maxLengthRule,
  minLengthRule,
  passwordRule,
  uniqueRule,
} from "./rules";
import { IRulePayload, IRuleResponse } from "../../interfaces/validator";

export default class Rules<T extends Document> {
  email(parameters: IRulePayload): IRuleResponse {
    return emailRule(parameters.value);
  }

  password(parameters: IRulePayload): IRuleResponse {
    return passwordRule(parameters.value);
  }

  async unique(parameters: IRulePayload): Promise<IRuleResponse> {
    return await uniqueRule(
      parameters.value,
      parameters.model,
      parameters.property,
      parameters.where,
      parameters.whereNot
    );
  }

  async exists(parameters: IRulePayload): Promise<IRuleResponse> {
    return await existsRule(
      parameters.value,
      parameters.model,
      parameters.property,
      parameters.where,
      parameters.whereNot
    );
  }

  maxLength(parameters: IRulePayload): IRuleResponse {
    return maxLengthRule(
      parameters.value,
      parameters.property,
      parameters.size || 20
    );
  }

  minLength(parameters: IRulePayload): IRuleResponse {
    return minLengthRule(
      parameters.value,
      parameters.property,
      parameters.size || 2
    );
  }
}
