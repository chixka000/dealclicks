import { IValidator } from "../shared/interfaces/validator";

export interface IStoreValidator {
  storeName: IValidator;
  description?: IValidator;
}

export interface IStore {
  storeName: string;
  storeSlug?: string;
  description: string;
  owner: string;
}
