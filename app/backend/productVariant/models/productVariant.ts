import { Schema, model, models } from "mongoose";
import { IProductVariant } from "../interfaces";

const productVariantSchema = new Schema<IProductVariant>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  sizes: [{ type: String, required: false }],
  productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  media: [{ type: Schema.Types.ObjectId, ref: "File" }],
  stock: { type: Number, default: 0 },
});

const ProductVariant = () =>
  model<IProductVariant>("ProductVariant", productVariantSchema);

export default (models.ProductVariant || ProductVariant()) as ReturnType<
  typeof ProductVariant
>;
