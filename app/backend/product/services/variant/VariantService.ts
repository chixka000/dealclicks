import { Document } from "mongoose";
import { IVariant } from "../../interfaces/variant";
import Variant from "../../models/variant";
import { IProduct } from "../../interfaces/product";
import { getVariantIds } from "../../utils";
import { slugify } from "@/app/helper/formatter";

export default class VariantService {
  async createMany(product: Document & IProduct, variants: Array<IVariant>) {
    try {
      const appendProductId: Array<IVariant> = variants.map(
        (variant: IVariant) => {
          return {
            ...variant,
            product: product._id,
            slug: slugify(variant.name),
          };
        }
      );
      const result = await Variant.insertMany(appendProductId);

      const variantIds = getVariantIds(result);

      product.variants = variantIds;

      await product.save();

      return product;
    } catch (error) {
      throw error;
    }
  }
}
