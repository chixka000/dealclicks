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
    storeId: { type: Schema.Types.ObjectId, ref: "Store" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    slug: {
      type: String,
      slug: "name",
    },
    variants: [{ type: Schema.Types.ObjectId, ref: "ProductVariant" }],
  },
  {
    timestamps: true,
  }
);

const Product = () => model<IProduct>("Product", productSchema);

export default (models.Product || Product()) as ReturnType<typeof Product>;
