import { Schema, model, models } from "mongoose";
import { IProduct } from "../interfaces/product";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    stocks: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
      required: true,
    },
    storeId: { type: Schema.Types.ObjectId, ref: "Store" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    images: [{ type: Schema.Types.ObjectId, ref: "File" }],
    slug: {
      type: String,
      slug: "name",
    },
  },
  {
    timestamps: true,
  }
);

const Product = () => model<IProduct>("Product", productSchema);

export default (models.Product || Product()) as ReturnType<typeof Product>;
