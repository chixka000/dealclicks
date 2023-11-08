import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
  models,
} from "mongoose";
import { CategoryModelType, CategoryQueryHelpers, ICategory } from "../interfaces";
import { NextRequest } from "next/server";

const categorySchema = new Schema<
  ICategory,
  Model<ICategory, CategoryQueryHelpers>,
  {},
  CategoryQueryHelpers
>(
  {
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    storeId: { type: Schema.Types.ObjectId, required: true, ref: 'Store' },
    deleted: {type: Boolean, required: false, default: false}
  },
  {
    timestamps: true,
  }
);

categorySchema.query.populateRelations = function populateRelations(
  this: QueryWithHelpers<any, HydratedDocument<ICategory>, CategoryQueryHelpers>,
  request: NextRequest
) {
  const includes = request.nextUrl.searchParams.get("includes");

  if (includes) {
    
    const relations = includes.split(",");

    relations.forEach((relation) => {
      switch (relation.toLowerCase()) {
        case "creator":
          this.populate("createdBy");
          break;
        case "store":
          this.populate("storeId");
          break;
        default:
          break;
      }
    });
  }

  return this;
};

const Category = () =>
  model<ICategory, CategoryModelType>("Category", categorySchema);

export default (models.Category || Category()) as ReturnType<typeof Category>;
