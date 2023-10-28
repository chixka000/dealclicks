import { Document, Model } from "mongoose";
import { IRuleResponse } from "../../interfaces";

export function email(value: string): IRuleResponse {
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

export function password(value: string): IRuleResponse {
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

export async function unique<T extends Document>(
  value: any,
  model: Model<T>,
  property: any,
  where?: any,
  whereNot?: any
): Promise<IRuleResponse> {
  try {
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
