import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
  models,
} from "mongoose";
import {
  IStore,
  StoreModelType,
  StoreQueryHelpers,
} from "@/app/backend/store/interfaces";

const storeSchema = new Schema<
  IStore,
  Model<IStore, StoreQueryHelpers>,
  {},
  StoreQueryHelpers
>(
  {
    storeName: { type: String, required: true, minlength: 2, unique: true },
    storeSlug: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

storeSchema.query.paginate = function paginate(
  this: QueryWithHelpers<any, HydratedDocument<IStore>, StoreQueryHelpers>,
  page: number,
  limit: number
) {
  // pagination operation
  const skip = (page - 1) * limit;

  this.skip(skip).limit(limit);

  return this;
};

const StoreHandler = () => model<IStore, StoreModelType>("Store", storeSchema);

const Store = (models.Store || StoreHandler()) as ReturnType<
  typeof StoreHandler
>;

export default Store;
