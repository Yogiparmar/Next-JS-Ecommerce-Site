import { model, Schema, models } from "mongoose";
import { CategoryModel } from "./CategoryModel";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = models.Product || model("Product", ProductSchema);
