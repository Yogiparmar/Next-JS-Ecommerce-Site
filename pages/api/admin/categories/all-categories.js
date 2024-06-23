import DbConnection from "@/lib/DbConnection";
import { CategoryModel } from "@/models/CategoryModel";

export default async function regihandlerster(req, res) {
  DbConnection();

  if (req.method === "GET") {
    let categories = await CategoryModel.find();

    if (categories.length < 0) {
      return res.status(404).json({ message: "No Category found" });
    }

    return res.status(200).json(categories);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
