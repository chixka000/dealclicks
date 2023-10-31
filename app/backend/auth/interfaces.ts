import { IValidator } from "../shared/interfaces/validator";

export interface IAuthValidator {
    email: IValidator;
    password: IValidator;
    remember: IValidator;
  }