import DbConnection from "@/lib/DbConnection";
import { CategoryModel } from "@/models/CategoryModel";

export default async function editeCategory(req, res) {
  DbConnection();
  if (req.method === "POST") {
    const { id, name } = req.body;

    console.log(id, name);

    if (!name) {
      return res.status(400).json({ message: "Please Provide Category Name" });
    }

    const catAvail = await CategoryModel.findOne({ _id: id });

    if (!catAvail) {
      return res.status(409).json({ message: "Category not Found" });
    } else {
      await CategoryModel.updateOne({ _id: id }, { name: name })
        .then(() => {
          return res.status(200).json({ message: "Category updated successfully" });
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
