import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
  models,
} from "mongoose";
import {
  CategoryModelType,
  CategoryQueryHelpers,
  ICategory,
} from "@/app/backend/category/interfaces";
// import { NextRequest } from "next/server";

const categorySchema = new Schema<
  ICategory,
  Model<ICategory, CategoryQueryHelpers>,
  {},
  CategoryQueryHelpers
>(
  {
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    store: { type: Schema.Types.ObjectId, required: true, ref: "Store" },
    deleted: { type: Boolean, required: false, default: false },
    subCategories: [
      { type: Schema.Types.ObjectId, ref: "Category", default: [] },
    ],
    parent: { type: Schema.Types.ObjectId, required: false, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

categorySchema.query.populateRelations = function populateRelations(
  this: QueryWithHelpers<
    any,
    HydratedDocument<ICategory>,
    CategoryQueryHelpers
  >,
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
          this.populate("store");
          break;
        case "parent":
          this.populate("parent");
          break;
        default:
          break;
      }
    });
  }

  return this;
};

const CategoryModelHandler = () =>
  model<ICategory, CategoryModelType>("Category", categorySchema);

const Category = (models.Category || CategoryModelHandler()) as ReturnType<
  typeof CategoryModelHandler
>;

export default Category;
