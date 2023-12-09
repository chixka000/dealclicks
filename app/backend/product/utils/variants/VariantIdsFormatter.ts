import { Document, Schema } from "mongoose";
import { IVariant } from "@/app/backend/product/interfaces/variant";

export const getVariantIds = (
  variants: Array<Document & IVariant>
): Array<Schema.Types.ObjectId> => {
  try {
    const ids: Array<Schema.Types.ObjectId> = [];

    variants.forEach((element: Document & IVariant) => {
      ids.push(element._id);
    });

    return ids;
  } catch (error) {
    throw error;
  }
};
