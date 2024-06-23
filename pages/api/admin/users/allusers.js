import { UserModel } from "@/models/UserModel";
import DbConnection from "@/lib/DbConnection";

export default async function regihandlerster(req, res) {
  DbConnection();

  if (req.method === "GET") {
    let users = await UserModel.find();

    if(users.length < 0){
        return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
