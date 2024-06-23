import DbConnection from "@/lib/DbConnection";
import { CategoryModel } from "@/models/CategoryModel";

export default async function deleteuser(req, res) {
  DbConnection();
  if (req.method === "DELETE") {

    const { id } = req.query; 

    if (!id) {
        
      return res
        .status(400)
        .json({ message: "Please provide the Category ID" });

    } else {

      await CategoryModel.deleteOne({ _id: id })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Category not found" });
          }
          return res.status(200).json({ message: "Category deleted successfully" });
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
        });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
