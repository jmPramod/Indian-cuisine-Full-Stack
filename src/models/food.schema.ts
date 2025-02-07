import mongoose, { Schema, Document } from "mongoose";


export interface FoodSchema extends Document {
  name: string;
  ingredients: string[];
  diet: string; 
  prep_time: number;
  cook_time: number; 
  flavor_profile: string; 
  course: string;
  state: string; 
  region: string;
  imgPublicId: string | null;
  img: string;
  createdBy: mongoose.Types.ObjectId | null;}

// Define the Mongoose schema for Food
const Food : Schema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: {  type: [String], required: true }, 
    diet: { type: String, required: true },
    prep_time: { type: Number, required: true }, 
    cook_time: { type: Number, required: true }, 
    flavor_profile: { type: String, required: true }, 
    course: { type: String, required: true }, 
    state: { type: String, required: true }, 
    region: { type: String, required: true }, 
    img: { type: String, default: "" }, 
    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    }, 
    imgPublicId: { type: String, default: null }
 
  },
  { timestamps: true }
);


export default mongoose.model<FoodSchema>("food", Food);
