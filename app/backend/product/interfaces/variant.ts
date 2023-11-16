import { HydratedDocument, Model, QueryWithHelpers, Schema } from "mongoose";

export interface IVariant {
  url: string;
  sizes: Array<string>;
  name: string;
  product: Schema.Types.ObjectId;
  media: Array<Schema.Types.ObjectId>;
  stock: number;
}

export interface VariantQueryHelpers {
  populateRelations(
    request: NextRequest
  ): QueryWithHelpers<
    HydratedDocument<IVariant>[],
    HydratedDocument<IVariant>,
    VariantQueryHelpers
  >;
}

export type VariantModelType = Model<IVariant, VariantQueryHelpers>;
