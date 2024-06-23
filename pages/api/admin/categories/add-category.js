import { CategoryModel } from "@/models/CategoryModel";
import DbConnection from "@/lib/DbConnection";

export default async function addCategory(req, res) {
  DbConnection();

  if (req.method === "POST") {
    let { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Please Provide Category Name" });
    }

    const existingCat = await CategoryModel.findOne({ name });

    if (!existingCat) {
      const category = await CategoryModel.create({ name });
      await category.save();
      return res.status(201).json({ message: "Category Created Successfully" });
    } else {
      return res.status(409).json({ message: "Category Already Exists" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
