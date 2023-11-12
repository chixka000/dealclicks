import { Document } from "mongoose";
import {
  emailRule,
  existsRule,
  maxLengthRule,
  minLengthRule,
  passwordRule,
  uniqueRule,
} from "./rules";
import { IRuleLengthParameter, IRuleQueryParameters, IRuleResponse, IRuleValueParameter } from "../../interfaces/validator";

export default class Rules {
  email(parameters: IRuleValueParameter): IRuleResponse {
    return emailRule(parameters.value);
  }

  password(parameters: IRuleValueParameter): IRuleResponse {
    return passwordRule(parameters.value);
  }

  async unique(parameters: IRuleQueryParameters): Promise<IRuleResponse> {
    return await uniqueRule(
      parameters.value,
      parameters.property,
      parameters.model,
      parameters.where,
      parameters.whereNot
    );
  }

  async exists(parameters: IRuleQueryParameters): Promise<IRuleResponse> {
    return await existsRule(
      parameters.value,
      parameters.property,
      parameters.model,
      parameters.where,
      parameters.whereNot
    );
  }

  maxLength(parameters: IRuleLengthParameter): IRuleResponse {
    return maxLengthRule(
      parameters.value,
      parameters.property,
      parameters.size || 20
    );
  }

  minLength(parameters: IRuleLengthParameter): IRuleResponse {
    return minLengthRule(
      parameters.value,
      parameters.property,
      parameters.size || 2
    );
  }
}
