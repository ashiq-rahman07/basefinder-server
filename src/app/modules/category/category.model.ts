import { Schema, model, Document, Types } from "mongoose";
import { ICategory } from "./category.interface";

// Extend Mongoose Document with ICategory
interface ICategoryDocument extends Document, ICategory { }

// Define the schema
const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
  
    description: {
      type: String,
      trim: true,
    },
 
   
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);



export const Category = model<ICategoryDocument>("Category", categorySchema);