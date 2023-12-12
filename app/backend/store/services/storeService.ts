import { sendErrorResponse } from "@/app/backend/shared/exception/errorResponse";
import User from "@/app/backend/user/models/user";
import Store from "@/app/backend/store/models/store";
import { slugify } from "@/app/helper/formatter";
import mongoose, { ClientSession } from "mongoose";
import { IStore } from "@/app/backend/store/interfaces";

export default class StoreService {
  async createStore(
    payload: IStore,
    request: NextRequest,
    session?: ClientSession
  ) {
    try {
      // get user logged in using the is of aboves result
      const user = await User.findOne({ _id: request.user._id });

      // return 401 error response if no user found in the query above
      if (!user) {
        return sendErrorResponse({ code: 401, message: "Token invalid" });
      }

      // get store with storeName equal to the client's inputed storename and client's id
      let store = await Store.findOne({
        storeName: payload.storeName,
        owner: request.user._id,
      });

      // return 409 error response if there is a store found
      if (store) {
        return sendErrorResponse({
          code: 409,
          message: "You already created this store.",
        });
      }

      // transform inputed storeName to slug format to use in the storeSlug model property
      const storeNameSlug = slugify(payload.storeName);

      // store payload
      const storePayload = {
        storeName: payload.storeName,
        storeSlug: storeNameSlug,
        description: payload?.description,
        owner: request.user._id,
      };

      // initialize Store model instance
      const newStore = new Store(storePayload);

      // save store
      await newStore.save({ session });

      // push the newly created store in the user model's stores property to create relationship
      user.stores.push(newStore._id);

      // save the update user
      await user.save({ session });

      // return the newly create store
      return newStore;
    } catch (error) {
      // throw the error
      throw error;
    }
  }

  async deleteStore(
    storeId: string,
    request: NextRequest,
    session: ClientSession
  ) {
    try {
      // get store with _id equal to the roure parameter Id and owner equal to me._id(logged in user's id)
      const store = await Store.findOne(
        {
          _id: storeId,
          owner: request.user._id,
        },
        { session }
      );

      // return 404 error response if there is no store found
      if (!store)
        return sendErrorResponse({ code: 404, message: "Store not found" });

      // delete store with _id equal to store._id
      await Store.deleteOne({ _id: store._id }, { session });

      // filter user stores to remove the deleted store in the relationship
      const newStores = request.user.stores.filter(
        (item: mongoose.Types.ObjectId) => !item.equals(storeId)
      );

      // update the user's stores
      await User.updateOne(
        { _id: request.user._id },
        { $set: { stores: newStores } },
        { session }
      );
    } catch (error) {
      // throw the error
      throw error;
    }
  }
}
