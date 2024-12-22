import mongoose from "../database/db.js";
import argon2 from "argon2";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de usuario es requerido"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es requerido"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.hash = async function () {
  this.password = await argon2.hash(this.password);
};

userSchema.methods.verify = async function (password) {
  return await argon2.verify(this.password, password);
};

const User = mongoose.model("user", userSchema);

export default User;
