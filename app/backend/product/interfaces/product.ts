import { HydratedDocument, Model, QueryWithHelpers, Schema } from "mongoose";
import { IValidator, SchemaField } from "../../shared/interfaces/validator";

export interface IProduct {
  name: string;
  description?: string;
  price: number;
  stocks: number;
  url: string;
  category: Schema.Types.ObjectId;
  isSpecialOffer: Boolean;
  isFeatured: Boolean;
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
  storeId: SchemaField;
  categoryId: SchemaField;
  isFeatured: SchemaField;
  isSpecialOffer: SchemaField;
  variants: SchemaField;
}

export interface IProductPayload {
  name: string;
  description?: string;
  storeId: Schema.Types.ObjectId;
  categoryId: Schema.Types.ObjectId;
  variants: Array<Schema.Types.ObjectId>;
  isFeature?: boolean;
  isSpecialOffer?: boolean;
}

export interface ProductQueryHelpers {
  populateRelations(
    request: NextRequest
  ): QueryWithHelpers<
    HydratedDocument<IProduct>[],
    HydratedDocument<IProduct>,
    ProductQueryHelpers
  >;
  paginate(
    cursor: string | null,
    limit: number
  ): QueryWithHelpers<
    HydratedDocument<IProduct>[],
    HydratedDocument<IProduct>,
    ProductQueryHelpers
  >;
}

export type ProductModelType = Model<IProduct, ProductQueryHelpers>;
