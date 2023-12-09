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
} from "@/app/backend/product/interfaces/product";
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
    isSpecialOffer: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    store: { type: Schema.Types.ObjectId, ref: "Store" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
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

    if (request.nextUrl.pathname.includes("/api/client")) {
      relations = relations.filter((item) => item.toLowerCase() !== "owner");
    }

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
        case "category":
          this.populate("category");
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

  this.select("-owner -createdAt -updatedAt -__v");

  return this;
};

productSchema.query.paginate = function paginate(
  this: QueryWithHelpers<any, HydratedDocument<IProduct>, ProductQueryHelpers>,
  cursor: string | null,
  limit: number
) {
  if (cursor) this.find({ _id: { $gt: cursor } }).limit(limit);

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
