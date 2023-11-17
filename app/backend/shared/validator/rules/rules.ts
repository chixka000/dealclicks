import mongoose, { Document, Model, models } from "mongoose";
import { IRuleResponse } from "../../interfaces/validator";

export function emailRule(value: string): IRuleResponse {
  if (!value)
    return {
      error: true,
      type: "EMAIL_FORMAT",
      message: "Invalid email format",
    };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(value))
    return {
      error: false,
    };

  return {
    error: true,
    type: "EMAIL_FORMAT",
    message: "Invalid email format",
  };
}

export function passwordRule(value: string): IRuleResponse {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]{8,})$/;

  if (passwordRegex.test(value)) {
    return { error: false };
  }

  return {
    error: true,
    type: "PASSWORD_FORMAT",
    message:
      "Sorry, the password you entered does not meet the required format. Please ensure your password includes at least one uppercase letter, one lowercase letter, one digit (0-9), and one special character (e.g., @, #, $, %, ^, &, +, =, !). Additionally, it must be at least 8 characters long.",
  };
}

export async function uniqueRule(
  value: any,
  property: string,
  model?: Model<Document & any>,
  where?: object,
  whereNot?: object
): Promise<IRuleResponse> {
  try {
    if (!model)
      return {
        error: true,
        type: "UNIQUE",
        message: `Model not found.`,
      };

    // const modelInstance = models[model];

    // if (!modelInstance)
    //   return {
    //     error: true,
    //     type: "UNIQUE",
    //     message: `Model not found.`,
    //   };

    let query = { [property]: value };

    if (where) query = { ...query, ...where };

    if (whereNot) query = { ...query, ...whereNot };

    const baseQuery = await model.findOne(query);

    if (baseQuery)
      return {
        error: true,
        type: "UNIQUE",
        message: `${property} ${value} already exists`,
      };

    return { error: false };
  } catch (error) {
    return {
      error: true,
      type: "UNIQUE",
      message: `${property} ${value} already exists`,
    };
  }
}

export async function existsRule(
  value: any,
  property: string,
  model?: Model<Document>,
  where?: object,
  whereNot?: object
): Promise<IRuleResponse> {
  try {
    if (!model)
      return {
        error: true,
        type: "EXISTS",
        message: `${model} Model not found.`,
      };

    // const modelInstance = models[model];

    // if (!modelInstance)
    //   return {
    //     error: true,
    //     type: "EXISTS",
    //     message: `${model} Model not found.`,
    // };

    let query = {};

    if (!where && !whereNot) query = { _id: value };

    if (where) query = { ...query, ...where };

    if (whereNot) query = { ...query, ...whereNot };

    const baseQuery = await model.findOne({ ...query });

    if (!baseQuery)
      return {
        error: true,
        type: "EXISTS",
        message: `${property} not founds`,
      };

    return { error: false };
  } catch (error) {
    return {
      error: true,
      type: "EXISTS",
      message: `${property} not found`,
    };
  }
}

export function minLengthRule(
  value: any,
  property: string,
  size: number
): IRuleResponse {
  try {
    if (value.length < size) throw new Error("Invalid value");

    return { error: false };
  } catch (error) {
    return {
      error: true,
      type: "MINIMUM_LENGTH",
      message: `${property} must be atleast ${size} characters`,
    };
  }
}

export function maxLengthRule(
  value: any,
  property: string,
  size: number
): IRuleResponse {
  try {
    if (value.length > size) throw new Error("Invalid value");

    return { error: false };
  } catch (error) {
    return {
      error: true,
      type: "MAXIMUM_LENGTH",
      message: `${property} must not exceed ${size} characters`,
    };
  }
}
