import DbConnection from "@/lib/DbConnection";
import { ProductModel } from "@/models/ProductModel";

export default async function regihandlerster(req, res) {
  DbConnection();

  if (req.method === "GET") {
    let products = await ProductModel.find();

    if (products.length < 0) {
      return res.status(404).json({ message: "No Products found" });
    }

    const productIds = products.map((product) => product._id);

    return res.status(200).json(productIds);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
