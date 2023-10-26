import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  fullName: string;
  email: string;
  password: string;
  type: "admin" | "client";
  verified: boolean;
}
