import mongoose, { Schema } from "mongoose";

const SALT = 10;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    type: "admin" | "client",
    verified: Boolean
  },
  { timestamps: true }
);

userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(SALT);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
      } catch (err) {
        return next(err);
      }
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
