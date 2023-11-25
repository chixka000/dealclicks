import mongoose, { Document } from "mongoose";
import { IVariant } from "../../interfaces/variant";
import Variant from "../../models/variant";
import { IProduct } from "../../interfaces/product";
import { getVariantIds } from "../../utils";
import { slugify } from "@/app/helper/formatter";

export default class VariantService {
  async createMany(
    product: Document & IProduct,
    variants: Array<IVariant>,
    session: mongoose.ClientSession
  ) {
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
      const result = await Variant.insertMany(appendProductId, { session });

      const variantIds = getVariantIds(result);

      product.variants = variantIds;

      await product.save({ session });

      return product;
    } catch (error) {
      throw error;
    }
  }

  async createAndUpdateMany(
    product: Document & IProduct,
    variants: Array<Document & IVariant>,
    session: mongoose.ClientSession
  ) {
    try {
      const variantsToCreate: Array<Document & IVariant> = [];
      const variantsToUpdate: Array<Document & IVariant> = [];
      // segregate variants (create and update)
      variants.map((item) => {
        if (item._id) {
          variantsToUpdate.push(item);
          return;
        }

        variantsToCreate.push(item);
      });

      const variantsToDelete = product.variants.filter(
        (id) => !variantsToUpdate.find((itm) => itm._id === id)
      );

      // construct payload to create variants
      const appendProductIdCreate: Array<IVariant> = variantsToCreate.map(
        (variant: IVariant) => {
          return {
            ...variant,
            product: product._id,
            slug: slugify(variant.name),
          };
        }
      );

      // construct payload for update variants
      const appendProductIdUpdate: Array<IVariant> = variantsToUpdate.map(
        (variant: IVariant) => {
          return {
            ...variant,
            product: product._id,
            slug: slugify(variant.name),
          };
        }
      );

      // construct variants query to use in bulkwrite update
      const bulkWriteOpsUpdate = variantsToUpdate.map((variant) => ({
        updatedOne: {
          filter: { _id: variant._id },
          updated: { $set: { ...variant } },
        },
      }));

      // construct variants query to use in bulkwrite delete
      const bulkWriteOpsDelete = variantsToDelete.map((variantId) => ({
        deleteOne: {
          filter: { _id: variantId },
        },
      }));

      // create variants
      const createResult = await Variant.insertMany(appendProductIdCreate, {
        session,
      });

      // update variants
      const updateResult = await Variant.bulkWrite(bulkWriteOpsUpdate as any, {
        session,
      });

      // delete variants
      await Variant.bulkWrite(bulkWriteOpsDelete as any, { session });

      // store new variant ids
      const newVariantIds = getVariantIds(createResult);
    } catch (error) {
      throw error;
    }
  }
}
