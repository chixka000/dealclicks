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

async function singleValidatorHandler(
  field: string,
  data: Array<any>,
  schema: SchemaField,
  message?: { [key: string]: { [key: string]: string } }
) {
  let errors: Array<any> = [];
  for (let index = 0; index < data.length; index++) {
    const value = data[index];

    errors = await schemaFieldValidations(field, schema, value, message);
  }

  return errors;
}

async function singleValidateMembers(
  field: string,
  data: Array<any>,
  schema: SchemaField,
  message?: any
): Promise<Array<{ [key: string]: IRuleResponse }>> {
  const errors = await singleValidatorHandler(field, data, schema, message);

  return errors;
}

export async function validatorHandler(
  data: { [key: string]: any },
  schema: { [key: string]: SchemaField },
  message?: { [key: string]: { [key: string]: string } }
) {
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

async function validateMembers(
  data: { [key: string]: any },
  schema: { [key: string]: SchemaField },
  message?: any
): Promise<Array<{ [key: string]: IRuleResponse }>> {
  const errors = await validatorHandler(data, schema, message);

  return errors;
}

async function schemaFieldValidations(
  field: string,
  fieldSchema: SchemaField,
  value: any,
  message?: { [key: string]: { [key: string]: string } }
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
      message: message?.[field]?.required ?? `${field} is required`,
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
      message: message?.[field]?.type ?? `${field} value is invalid`,
    });
    hasError = true;
  }

  // validate enum types
  if (!hasError && fieldSchema.type === "enum") {
    if (!fieldSchema.enu) {
      errors = addError(field, errors, {
        error: true,
        type: "ENUM",
        message: message?.[field]?.type ?? `${field} has no enum list.`,
      });
      hasError = true;
    } else if (!fieldSchema.enu.includes(value)) {
      errors = addError(field, errors, {
        error: true,
        type: "ENUM",
        message:
          message?.[field]?.type ??
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
                  message?.[field]?.[rule.method] ?? executeRule?.message,
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
        value.forEach(async (element: { [key: string]: any }) => {
          const errorList = await validateMembers(
            element,
            fieldSchema.members!,
            message?.[field]
          );

          if (errorList.length) {
            errors = addError(field, errors, errorList);

            hasError = true;
          }
        });
      }

      if (fieldSchema.member) {
        const errorList = await singleValidateMembers(
          field,
          value,
          fieldSchema.member!,
          message?.[field]
        );

        if (errorList.length) {
          errors = addError(field, errors, errorList);

          hasError = true;
        }
      }
    }
  }

  // validate member
  if (!hasError && typeof value === "object" && fieldSchema.type === "object") {
    if (fieldSchema.members) {
      const errorList = await validateMembers(
        value,
        fieldSchema.members!,
        message?.[field]
      );

      if (errorList.length) {
        errors = addError(field, errors, errorList);

        hasError = true;
      }
    }
  }

  return errors;
}
