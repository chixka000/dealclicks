import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/users";
import bcrypt from "bcrypt";
const SALT = 10;

const userSchema = new Schema<IUser & Document>(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    type: String,
    verified: Boolean,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (this: IUser & Document, next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(SALT);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    console.log(err);
    return next(err as Error);
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
