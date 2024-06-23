import DbConnection from "@/lib/DbConnection";
import { ProductModel } from "@/models/ProductModel";

export default async function createProduct(req, res) {
  DbConnection();
  if (req.method === "POST") {
    const { name, description, cost, category, image } = req.body;

    if (!name || !description || !cost || !category || !image) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
      const product = await ProductModel.create({
        name,
        description,
        cost,
        category,
        image,
      });

      await product.save();
      return res.status(201).json({ message: "Product Created Successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
