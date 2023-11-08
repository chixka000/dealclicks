import { NextRequest } from "next/server";
import { ICategory, ICategoryValidator } from "../interfaces";
import { IUser } from "../../user/interfaces";
import Category from "../models/category";
import Store from "../../store/models/store";
import { authorize } from "../../shared/utils/getDataFromToken";

export async function categoryValidator(
  request: NextRequest,
  data: ICategory,
  params?: { id: string }
): Promise<{ schema: ICategoryValidator; message: any; user: IUser }> {
  try {
    // check if there is user logged in
    const user = await authorize(request);

    // validate if user exists
    if (!user)
      throw new Error(`You don't have permission to execute this request.`);
    // get request method
    const method = request.method;

    // define schema for the data

    const schema: ICategoryValidator = {
      name: {
        type: "string",
        required: true,
        rules: [
          {
            method: "unique",
            property: "name",
            model: Category,
            where: { name: data.name, storeId: data.storeId },
            whereNot:
              method === "PATCH" || method === "PUT"
                ? { _id: { $ne: params!.id } }
                : {},
          },
          {
            method: "minLength",
            property: "name",
          },
        ],
      },
      storeId: {
        type: "string",
        required: true,
        rules: [
          {
            method: "exists",
            property: "storeId",
            model: Store,
            where: { _id: data.storeId, owner: user._id },
          },
        ],
      },
    };

    // add message (optional)
    const message = {};

    // return schame, message and user
    return { schema, message, user };
  } catch (error) {
    // throw error
    throw new Error(`You don't have permission to execute this request.`);
  }
}
