import { Document } from "mongoose";

export interface IUser extends Document {
  _id?: string;
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
