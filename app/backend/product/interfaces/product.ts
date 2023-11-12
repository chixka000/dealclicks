import { Schema } from "mongoose";
import { IValidator } from "../../shared/interfaces/validator";

export interface IProduct {
  name: string;
  description?: string;
  price: number;
  stocks: number;
  url: string;
  images: [
    {
      tag: "list" | "main";
      imageId: Schema.Types.ObjectId;
    }
  ];
  storeId: Schema.Types.ObjectId;
  slug: string;
  owner: Schema.Types.ObjectId;
  variants: Array<Schema.Types.ObjectId>;
}

export interface IProductValidator {
  name: IValidator;
  description: IValidator;
  price: IValidator;
  storeId: IValidator;
  variants: IValidator;
}
