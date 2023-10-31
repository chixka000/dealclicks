import { IStore } from "../../../interfaces";
import { NextRequest } from "next/server";
import { sendErrorResponse } from "../../shared/exception/errorResponse";
import User from "../../user/models/user";
import Store from "../models/store";
import { slugify } from "@/app/helper/formatter";
import mongoose from "mongoose";
import { authorize } from "../../shared/utils/getDataFromToken";

export default class StoreService {
  async createStore(payload: IStore, request: NextRequest) {
    try {
      // validate user is logged in
      const me = await authorize(request);

      // get user logged in using the is of aboves result
      const user = await User.findOne({ _id: me?.id });

      // return 401 error response if no user found in the query above
      if (!user) {
        return sendErrorResponse(401, {
          error: "Token invalid",
        });
      }

      // get store with storeName equal to the client's inputed storename and client's id
      let store = await Store.findOne({
        storeName: payload.storeName,
        _id: me.id,
      });

      // return 409 error response if there is a store found
      if (store) {
        return sendErrorResponse(409, {
          error: "You already created this store.",
        });
      }

      // transform inputed storeName to slug format to use in the storeSlug model property
      const storeNameSlug = slugify(payload.storeName);

      // create the new store
      store = await Store.create({
        storeName: payload.storeName,
        storeSlug: storeNameSlug,
        description: payload?.description,
        owner: me.id,
      });

      // push the newly created store in the user model's stores property to create relationship
      user.stores.push(store._id);

      // save the update user
      await user.save();

      // return the newly create store
      return store;
    } catch (error) {
      // throw the error
      throw error;
    }
  }

  async deleteStore(storeId: string, request: NextRequest) {
    try {
      // validate user is logged in
      const me = await authorize(request);

      // return 401 error response if there is no logged in user
      if (!me)
        return sendErrorResponse(401, {
          error: "You have no permission to execute this request.",
        });

      // get store with _id equal to the roure parameter Id and owner equal to me._id(logged in user's id)
      const store = await Store.findOne({ _id: storeId, owner: me._id });

      // return 404 error response if there is no store found
      if (!store)
        return sendErrorResponse(404, {
          error: "Store not found",
        });

      // delete store with _id equal to store._id
      await Store.deleteOne({ _id: store._id });

      // filter user stores to remove the deleted store in the relationship
      const newStores = me.stores.filter(
        (item: mongoose.Types.ObjectId) => !item.equals(storeId)
      );

      // update the user's stores
      await User.updateOne({ _id: me._id }, { $set: { stores: newStores } });
    } catch (error) {
      // throw the error
      throw error;
    }
  }
}
