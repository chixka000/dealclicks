import mongoose from "mongoose";
import { IValidator } from "../shared/interfaces/validator";

export interface IStoreValidator {
  storeName: IValidator;
  description?: IValidator;
}

export interface IStore {
  storeName: string;
  storeSlug?: string;
  description: string;
  owner: mongoose.Schema.Types.ObjectId;
}
