import mongoose, { Schema, model, models, Document, ObjectId } from "mongoose";

export interface UserType extends Document {
  _id: ObjectId;
  fullname: string;
  email: string;
  password: string;
  profileImage: string;
  profileImagePublicId: string; //generated by cloudinary
  isVerified: boolean;
  resetPasswordToken: String | undefined;
  resetPasswordExpiry: number | undefined;
  verificationToken: String | undefined;
  verificationTokenExpiry: number | undefined;
  lastLogin: Date;
}

export const userSchema: Schema<UserType> = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Passowrd must be at least 8 characters."],
    },
    profileImage: {
      type: String,
      required: [true, "Profile image is required."],
    },
    profileImagePublicId: {
      type: String,
      required: [true, "Profile image public id is required."],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Number,
    verificationToken: String,
    verificationTokenExpiry: Number,
  },
  { timestamps: true }
);

const User =
  (models.User as mongoose.Model<UserType>) ||
  model<UserType>("User", userSchema);

export default User;
