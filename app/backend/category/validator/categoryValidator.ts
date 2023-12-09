import { ICategoryPayload, ICategoryValidator } from "@/app/backend/category/interfaces";
import { Schema } from "@/app/backend/shared/validator";
import Category from "@/app/backend/category/models/category";
import Store from "@/app/backend/store/models/store";

export async function categoryValidator(
  request: NextRequest,
  data: ICategoryPayload,
  params?: { id: string }
): Promise<{ schema: ICategoryValidator; message: any }> {
  try {
    // get request method
    const method = request.method;

    // define schema for the data
    const schema: ICategoryValidator = {
      name: Schema.String({
        trim: true,
        rules: [
          {
            method: "unique",
            model: Category,
            where: { name: data.name, store: data.storeId },
            whereNot:
              method === "PATCH" || method === "PUT"
                ? { _id: { $ne: params!.id } }
                : {},
          },
          {
            method: "minLength",
          },
        ],
      }),
      storeId: Schema.String({
        trim: true,
        rules: [
          {
            method: "exists",
            model: Store,
            where: { _id: data.storeId, owner: request.user._id },
          },
        ],
      }),
      parent: Schema.StringOptional({
        trim: true,
        rules: [
          {
            method: "exists",
            model: Category,
            where: { _id: data?.parent, owner: request.user._id },
          },
        ],
      }),
    };

    // add message (optional)
    const message = {};

    // return schame, message and user
    return { schema, message };
  } catch (error) {
    // throw error
    throw new Error(`You don't have permission to execute this request.`);
  }
}
