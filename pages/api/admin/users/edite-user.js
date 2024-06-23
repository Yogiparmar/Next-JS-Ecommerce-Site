import DbConnection from "@/lib/DbConnection";
import { UserModel } from "@/models/UserModel";

export default async function editeUser(req, res) {
  DbConnection();
  if (req.method === "POST") {
    const { name, email } = req.body;

    const { id } = req.query; 

    if (!name || !email) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userAvail = await UserModel.findOne({ _id: id });

    if (!userAvail) {
      return res.status(409).json({ message: "User not Found" });
    } else {
      await UserModel.updateOne({ _id: id }, { name: name, email: email })
        .then(() => {
          return res.status(200).json({ message: "User updated successfully" });
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
