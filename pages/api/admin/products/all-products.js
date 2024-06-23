import DbConnection from "@/lib/DbConnection";
import { CategoryModel } from "@/models/CategoryModel";
import { ProductModel } from "@/models/ProductModel";

export default async function regihandlerster(req, res) {
  DbConnection();

  if (req.method === "GET") {
    let products = await ProductModel.find().populate("category");

    if (products.length < 0) {
      return res.status(404).json({ message: "No Products found" });
    }

    return res.status(200).json(products);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
