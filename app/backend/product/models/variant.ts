import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
  models,
} from "mongoose";
import {
  IVariant,
  VariantModelType,
  VariantQueryHelpers,
} from "../interfaces/variant";

const variantSchema = new Schema<
  IVariant,
  Model<IVariant, VariantQueryHelpers>,
  {},
  VariantQueryHelpers
>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  sizes: [{ type: String, required: false }],
  product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  media: [{ type: Schema.Types.ObjectId, ref: "File" }],
  stock: { type: Number, default: 0 },
});

variantSchema.query.populateRelations = function populateRelations(
  this: QueryWithHelpers<any, HydratedDocument<IVariant>, VariantQueryHelpers>,
  request: NextRequest
) {
  const includes = request.nextUrl.searchParams.get("include");

  if (includes) {
    const relations = includes.split(",");

    relations.forEach((relation) => {
      switch (relation.toLowerCase()) {
        case "product":
          this.populate("product");
          break;
        case "media":
          this.populate("media");
          break;
        default:
          break;
      }
    });
  }

  return this;
};

const Variant = () =>
  model<IVariant, VariantModelType>("Variant", variantSchema);

export default (models.Variant || Variant()) as ReturnType<typeof Variant>;
