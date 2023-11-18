import { authorize } from "../../shared/utils/getDataFromToken";
import { IStore, IStoreValidator } from "../interfaces";
import { IUser } from "../../user/interfaces";
import { Schema } from "../../shared/validator";
import Store from "../models/store";

export async function storeValidator(
  request: NextRequest,
  data: IStore,
  params?: { id: string }
): Promise<{ schema: IStoreValidator; message: any }> {
  try {
    const method = request.method;

    const schema: IStoreValidator = {
      storeName: Schema.String({
        trim: true,
        rules: [
          {
            method: "unique",
            model: Store,
            where: { storeName: data.storeName },
            whereNot:
              method === "PATCH" || method === "PUT"
                ? { _id: { $ne: params!.id } }
                : {},
          },
        ],
      }),
      description: Schema.StringOptional({ trim: true }),
    };

    const message: any = {
      storeName: {
        unique:
          method === "POST"
            ? "You already created this store."
            : `You already have a store with this name.`,
      },
    };

    return { schema, message };
  } catch (error) {
    throw new Error(`You don't have permission to execute this request.`);
  }
}
