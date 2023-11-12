import { IRuleResponse } from "../../interfaces/validator";

export function addError(
  field: string,
  errors: Array<{
    [key: string]: Array<{ [key: string]: IRuleResponse }> | IRuleResponse;
  }> = [],
  error: Array<{ [key: string]: IRuleResponse }> | IRuleResponse
) {
  const fieldError = errors.find((item) => item[field]);

  if (fieldError) return errors;

  errors.push({
    [field]: error,
  });

  return errors;
}
