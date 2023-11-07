import { HydratedDocument, Model, QueryWithHelpers, Schema } from "mongoose";
import { IValidator } from "../shared/interfaces/validator";
import { NextRequest } from "next/server";

export interface ICategory {
  name: string;
  createdBy: Schema.Types.ObjectId;
  storeId: Schema.Types.ObjectId;
  deleted: boolean;
}

export interface ICategoryValidator {
  name: IValidator;
  storeId: IValidator;
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
