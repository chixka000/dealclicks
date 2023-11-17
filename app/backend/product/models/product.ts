import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
  models,
} from "mongoose";
import {
  IProduct,
  ProductModelType,
  ProductQueryHelpers,
} from "../interfaces/product";
import { slugify } from "@/app/helper/formatter";

const productSchema = new Schema<
  IProduct,
  Model<IProduct, ProductQueryHelpers>,
  {},
  ProductQueryHelpers
>(
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
    store: { type: Schema.Types.ObjectId, ref: "Store" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    slug: {
      type: String,
      slug: "name",
    },
    variants: [{ type: Schema.Types.ObjectId, ref: "Variant" }],
  },
  {
    timestamps: true,
  }
);

productSchema.query.populateRelations = function populateRelations(
  this: QueryWithHelpers<any, HydratedDocument<IProduct>, ProductQueryHelpers>,
  request: NextRequest
) {
  const includes = request.nextUrl.searchParams.get("include");

  if (includes) {
    let relations = includes.split(",");

    if (relations.includes("variant.media"))
      relations = relations.filter((item) => item !== "variants");

    relations.forEach((relation) => {
      switch (relation.toLowerCase()) {
        case "store":
          this.populate("store");
          break;
        case "owner":
          this.populate("owner");
          break;
        case "variants":
          this.populate("variants");
          break;
        case "variant.media":
          this.populate({ path: "variants", populate: { path: "media" } });
          break;
        default:
          break;
      }
    });
  }

  return this;
};

productSchema.query.paginate = function paginate(
  this: QueryWithHelpers<any, HydratedDocument<IProduct>, ProductQueryHelpers>,
  page: number,
  limit: number
) {
  // pagination operation
  const skip = (page - 1) * limit;

  this.skip(skip).limit(limit);

  return this;
};

productSchema.pre("save", async function (this: IProduct & Document, next) {
  // if (!this.isModified("password")) return next();

  try {
    this.slug = slugify(this.name);
    return next();
  } catch (err) {
    return next(err as Error);
  }
});

const ProductHandler = () =>
  model<IProduct, ProductModelType>("Product", productSchema);

const Product = (models.Product || ProductHandler()) as ReturnType<
  typeof ProductHandler
>;

export default Product;
