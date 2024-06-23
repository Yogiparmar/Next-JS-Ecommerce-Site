import DbConnection from "@/lib/DbConnection";
import { ProductModel } from "@/models/ProductModel";

export default async function regihandlerster(req, res) {
  DbConnection();

  if (req.method === "GET") {
    const { id } = req.query;

    let product = await ProductModel.findById({ _id: id });

    if (!product) {
      return res.status(404).json({ message: "No Products found" });
    }

    return res.status(200).json(product);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
