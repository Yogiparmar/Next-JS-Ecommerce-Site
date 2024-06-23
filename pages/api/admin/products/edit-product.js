import DbConnection from "@/lib/DbConnection";
import { ProductModel } from "@/models/ProductModel";

export default async function editeCategory(req, res) {
  DbConnection();
  if (req.method === "PUT") {
    const { id, name, description, cost, category, image } = req.body;

    if (!name || !description || !cost || !category || !image) {
      return res.status(400).json({ message: "Please Provide All Data" });
    }

    const existingPro = await ProductModel.findOne({ _id: id });

    if (!existingPro) {
      return res.status(409).json({ message: "Product not Found" });
    } else {
      await ProductModel.updateOne({ _id: id }, { name, description, cost, category, image })
        .then(() => {
          return res
            .status(200)
            .json({ message: "Product updated successfully" });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Internal Server Error", error: err.message });
        });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
