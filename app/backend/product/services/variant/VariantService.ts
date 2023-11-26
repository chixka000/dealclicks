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
      const variantsToUpdate: Array<Document & IVariant> = [];
      // create insert/update query in bulkWriteOptions
      let bulkWriteOps: Array<any> = variants.map((item) => {
        if (item._id) {
          variantsToUpdate.push(item);
          return {
            updatedOne: {
              filter: { _id: item._id },
              updated: {
                $set: {
                  ...item,
                  product: product._id,
                  slug: slugify(item.name),
                },
              },
            },
          };
        }

        return {
          insertOne: {
            document: {
              ...item,
              product: product._id,
              slug: slugify(item.name),
            },
          },
        };
      });

      // filter and construct query of variants to be deleted
      const variantsToDelete = product.variants
        .filter((id) => !variantsToUpdate.find((itm) => itm._id === id))
        .map((id) => {
          return {
            deleteOne: {
              filter: { _id: id },
            },
          };
        });

      // combine all queries
      bulkWriteOps = [...bulkWriteOps, ...variantsToDelete];

      // execute all queries at once using bulkWrite
      await Variant.bulkWrite(bulkWriteOps as any, { session });

      // fetch all variant ids of product
      const newVariant = await Variant.find(
        { product: product._id },
        { session }
      );

      const newVariantIds = newVariant.map((variant) => variant._id);
      // update product variant field
      product.variants = newVariantIds;

      await product.save();

      // return the updated product
      return product;
    } catch (error) {
      throw error;
    }
  }
}
