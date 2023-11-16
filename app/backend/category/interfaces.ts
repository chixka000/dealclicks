import { HydratedDocument, Model, QueryWithHelpers, Schema } from "mongoose";
import { SchemaField } from "../shared/interfaces/validator";
import { NextRequest } from "next/server";

export interface ICategory {
  name: string;
  createdBy: Schema.Types.ObjectId;
  store: Schema.Types.ObjectId;
  deleted?: boolean;
  parent?: Schema.Types.ObjectId;
  subCategories?: Array<Schema.Types.ObjectId>;
}

export interface ICategoryPayload {
  name: string;
  storeId: Schema.Types.ObjectId;
  parent?: Schema.Types.ObjectId;
}

export interface ICategoryValidator {
  name: SchemaField;
  storeId: SchemaField;
  parent?: SchemaField;
}

export interface CategoryQueryHelpers {
  populateRelations(
    request: NextRequest
  ): QueryWithHelpers<
    HydratedDocument<ICategory>[],
    HydratedDocument<ICategory>,
    CategoryQueryHelpers
  >;
}

export type CategoryModelType = Model<ICategory, CategoryQueryHelpers>;
