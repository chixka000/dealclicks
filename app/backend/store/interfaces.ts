import mongoose, { HydratedDocument, QueryWithHelpers } from "mongoose";
import { SchemaField } from "@/app/backend/shared/interfaces/validator";
import { Model } from "mongoose";

export interface IStoreValidator {
  storeName: SchemaField;
  description?: SchemaField;
}

export interface IStore {
  storeName: string;
  storeSlug?: string;
  description: string;
  owner: mongoose.Schema.Types.ObjectId;
}

export interface StoreQueryHelpers {
  paginate(
    page: number,
    limit: number
  ): QueryWithHelpers<
    HydratedDocument<IStore>[],
    HydratedDocument<IStore>,
    StoreQueryHelpers
  >;
}

export type StoreModelType = Model<IStore, StoreQueryHelpers>;
