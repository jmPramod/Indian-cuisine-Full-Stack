import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";
export interface Auth extends Document {

  firstName: string;
  lastName: string;
  phone: number;
  address: string;
  state: string;
  country: string;
  pinCode: number;
  email: string;
  password: string;
  isAdmin: string;
  profileImage:  {
    imageUrl: string;
    imgPublicId: string | null;
  };
}

const authSchema: Schema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: Number },
    address: { type: String },
    state: { type: String },
    country: { type: String },
    pinCode: { type: Number },
    email: { type: String },
    password: { type: String },
    isAdmin: { type: String, enum: ["admin", "user"], default: "user" },
    profileImage:{
      imageUrl: { type: String, default: "https://res.cloudinary.com/dtvq8ysaj/image/upload/v1720770108/Global%20Images/profile_new-removebg-preview_motz7n.png" },
      imgPublicId: { type: String, default: null }
    },
    favorite: [{ type: Schema.Types.ObjectId, ref: 'Food', default: null }], // Reference to Product model

  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Auth>("users", authSchema);

