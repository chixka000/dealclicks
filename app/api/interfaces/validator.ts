export interface IValidator {
  required?: boolean;
  rules?: Array<Function>;
  minLength?: Number;
  maxLength?: Number;
}

export interface IAuthValidator {
  email: IValidator;
  password: IValidator;
  remember: IValidator
}
