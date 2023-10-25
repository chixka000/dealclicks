

export interface IValidator  {
  required?: boolean,
  rules?: Array<Function>
}

export interface IAuthValidator {
    email: IValidator,
    password: IValidator
}
