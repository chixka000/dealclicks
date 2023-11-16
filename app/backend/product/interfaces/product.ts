import { HydratedDocument, Model, QueryWithHelpers, Schema } from "mongoose";
import { IValidator, SchemaField } from "../../shared/interfaces/validator";

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
  store: Schema.Types.ObjectId;
  slug: string;
  owner: Schema.Types.ObjectId;
  variants: Array<Schema.Types.ObjectId>;
}

export interface IProductValidator {
  name: SchemaField;
  description: SchemaField;
  price: SchemaField;
  storeId: SchemaField;
  variants: SchemaField;
}

export interface ProductQueryHelpers {
  populateRelations(
    request: NextRequest
  ): QueryWithHelpers<
    HydratedDocument<IProduct>[],
    HydratedDocument<IProduct>,
    ProductQueryHelpers
  >;
}

export type ProductModelType = Model<IProduct, ProductQueryHelpers>;
