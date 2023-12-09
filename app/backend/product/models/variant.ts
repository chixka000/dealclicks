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
} from "@/app/backend/product/interfaces/variant";
import { slugify } from "@/app/helper/formatter";

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
  media: [{ type: Schema.Types.ObjectId, required: false, ref: "File" }],
  stock: { type: Number, default: 0 },
  slug: { type: String, required: true },
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

variantSchema.pre("save", async function (this: IVariant & Document, next) {
  // if (!this.isModified("password")) return next();

  try {
    this.slug = slugify(this.name);
    return next();
  } catch (err) {
    return next(err as Error);
  }
});

const VariantHandler = () =>
  model<IVariant, VariantModelType>("Variant", variantSchema);

const Variant = (models.Variant || VariantHandler()) as ReturnType<
  typeof VariantHandler
>;

export default Variant;
