import Rules from ".";
import {
  DataType,
  IRulePayload,
  IRuleResponse,
  SchemaField,
} from "../../interfaces/validator";
import { addError } from "./errorHanlder";

export function validateType(value: any, type: DataType): boolean {
  switch (type) {
    case "string":
      return typeof value === "string";
    case "number":
      return typeof value === "number";
    case "boolean":
      return typeof value === "boolean";
    case "array":
      return Array.isArray(value);
    case "enum":
      return (
        Array.isArray(value) &&
        value.every((element) => typeof element === "string")
      );
    case "object":
      return typeof value === "object";
    default:
      return true;
  }
}

export async function validatorHandler(
  data: { [key: string]: any },
  schema: { [key: string]: SchemaField },
  message?: any
) {
  // console.log();

  let errors: Array<{ [key: string]: IRuleResponse }> = [];

  for (const field in schema) {
    const fieldError = errors.find((item) => item[field]);

    if (!fieldError && schema.hasOwnProperty(field)) {
      const errorResult = await schemaFieldValidations(
        field,
        schema[field],
        data[field],
        message
      );

      errors = [...errors, ...errorResult];
    }
  }

  return errors;
}

async function schemaFieldValidations(
  field: string,
  fieldSchema: SchemaField,
  value: any,
  message?: {
    [key: string]: {
      [key: string]: string;
    };
  }
) {
  let hasError = false;

  let errors: Array<any> = [];

  // validate required
  if (
    fieldSchema.required &&
    (value === undefined || value === null || !value?.length)
  ) {
    errors = addError(field, errors, {
      error: true,
      type: "REQUIRED",
      message:
        message?.[field]?.required ??
        message?.["*"]?.required ??
        `${field} is required`,
    });

    hasError = true;
  }

  // validate Type
  if (
    !hasError &&
    value &&
    fieldSchema.type &&
    !validateType(value, fieldSchema.type)
  ) {
    errors = addError(field, errors, {
      error: true,
      type: "VALUE_TYPE",
      message:
        message?.[field]?.type ??
        message?.["*"]?.type ??
        `${field} value is invalid`,
    });
    hasError = true;
  }

  // validate enum types
  if (!hasError && fieldSchema.type === "enum") {
    if (!fieldSchema.enu) {
      errors = addError(field, errors, {
        error: true,
        type: "ENUM",
        message:
          message?.[field]?.type ??
          message?.["*"]?.type ??
          `${field} has no enum list.`,
      });
      hasError = true;
    } else if (!fieldSchema.enu.includes(value)) {
      errors = addError(field, errors, {
        error: true,
        type: "ENUM",
        message:
          message?.[field]?.type ??
          message?.["*"]?.type ??
          `${field} must be one of ${fieldSchema.enu.join(", ")}.`,
      });
      hasError = true;
    }
  }

  // execute rules
  if (!hasError && fieldSchema.rules) {
    if (value && fieldSchema.rules.length) {
      const rulePromises: Promise<void>[] = [];

      fieldSchema.rules.forEach((rule: IRulePayload) => {
        rulePromises.push(
          (async () => {
            const rules = new Rules();

            const executeRule = await rules[rule.method]({
              value,
              model: rule.model,
              property: field,
              where: rule.where,
              whereNot: rule.whereNot,
              size: rule.size,
            });

            if (executeRule?.error) {
              errors = addError(field, errors, {
                ...executeRule,
                message:
                  message?.[field]?.[rule.method] ??
                  message?.["*"]?.[rule.method] ??
                  executeRule?.message,
              });

              hasError = true;
            }
          })()
        );
      });

      await Promise.all(rulePromises);
    }
  }

  // validate members
  if (!hasError && fieldSchema.type === "array") {
    if (value && value.length) {
      if (fieldSchema.members) {
        for (const [index, item] of value.entries()) {
          const itemErrors = await validatorHandler(
            item,
            fieldSchema.members,
            message?.[field] ?? message?.["*"]
          );

          if (itemErrors.length) {
            errors = addError(`${field}.${index}`, errors, itemErrors);
            hasError = true;
          }
        }
      }

      if (fieldSchema.member) {
        for (const [index, item] of value.entries()) {
          const itemErrors = await validatorHandler(
            { [index]: item },
            { [index]: fieldSchema.member },
            message?.[field] ?? message?.["*"]
          );

          if (itemErrors.length) {
            errors = addError(`${field}`, errors, itemErrors);
            hasError = true;
          }
        }
      }
    }
  }

  // validate member
  if (!hasError && typeof value === "object" && fieldSchema.type === "object") {
    if (fieldSchema.members) {
      const itemErrors = await validatorHandler(
        value,
        fieldSchema.members,
        message
      );

      if (itemErrors.length) {
        errors = addError(`${field}`, errors, itemErrors);
        hasError = true;
      }
    }
  }

  return errors;
}
