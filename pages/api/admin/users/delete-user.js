import DbConnection from "@/lib/DbConnection";
import { UserModel } from "@/models/UserModel";

export default async function deleteuser(req, res) {
  DbConnection();
  if (req.method === "DELETE") {
    const { id } = req.query; // Extract ID from req.query instead of req.body
    if (!id) {
      return res.status(400).json({ message: "Please provide the user ID" });
    }

    let numOfUser = await UserModel.find();

    if (numOfUser.length === 1) {
      return res.status(404).json({ message: "Can not delete Admin User" });
    } else {
      await UserModel.deleteOne({ _id: id })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
          }
          return res.status(200).json({ message: "User deleted successfully" });
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
