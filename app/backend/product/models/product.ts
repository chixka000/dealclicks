import mongoose, { Schema, Document, model } from "mongoose";
import slug from "mongoose-slug-generator";
import { autoIncrement } from "mongoose-plugin-autoinc";

mongoose.plugin(slug);

interface IProduct extends Document {
  name: string;
  price?: string;
  description?: string;
  stocks?: number;
  url: string;
  image_url?: string;
  slug: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      default: "0"
    },
    description: {
      type: String,
      default: ""
    },
    stocks: {
      type: Number,
      default: 0
    },
    url: {
      type: String,
      required: true
    },
    image_url: {
      type: String,
      default: ""
    },
    slug: {
      type: String,
      slug: "name",
      unique: true
    }
  },
  {
    timestamps: true
  }
);

productSchema.plugin(autoIncrement, {
  model: "Product",
  field: "id",
  startAt: 1,
  incrementBy: 1
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
