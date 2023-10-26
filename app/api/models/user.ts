import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/users";
import bcrypt from "bcrypt";
const SALT = 10;

const userSchema = new Schema<IUser & Document>(
  {
    firstName: String,
    lastName: { type: String, required: false },
    fullName: String,
    email: String,
    password: { type: String, required: true, select: false },
    type: { type: String, default: "client" },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (this: IUser & Document, next) {
  // if (!this.isModified("password")) return next();

  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(SALT);
      this.password = await bcrypt.hash(this.password, salt);
    }

    if (this.isModified("firstName") || this.isModified("lastName")) {
      this.fullName = `${this.firstName}${
        this.lastName ? ` ${this.lastName}` : ""
      }`;
    }
    return next();
  } catch (err) {
    console.log(err);
    return next(err as Error);
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
