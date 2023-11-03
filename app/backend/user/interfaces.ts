import { Model, Schema } from "mongoose";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  firstName: string;
  lastName?: string;
  fullName: string;
  email: string;
  password: string;
  type: "admin" | "client";
  isVerified: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: string;
  stores: Array<any>;
}

export type FileModelType = Model<IUser>;
