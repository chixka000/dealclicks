import { Schema, Document, model, models } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces";
const SALT = 10;

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: [true, "Missing firstname field."] },
    lastName: { type: String, required: false },
    fullName: String,
    email: { type: String, unique: true },
    password: {
      type: String,
      required: [true, "Missing password field."],
      select: false,
    },
    type: { type: String, default: "client" },
    isVerified: { type: Boolean, default: false },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    stores: [{ type: Schema.Types.ObjectId, ref: "Store" }],
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
    return next(err as Error);
  }
});

const User = () => model("User", userSchema);

export default (models.User || User()) as ReturnType<typeof User>;
