import { Schema } from "mongoose";

export interface IProductVariant {
  url: string;
  sizes: Array<string>;
  name: string;
  productId: Schema.Types.ObjectId;
  media: Array<Schema.Types.ObjectId>;
  stock: number;
}
