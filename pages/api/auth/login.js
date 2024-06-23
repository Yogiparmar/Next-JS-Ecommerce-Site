import { UserModel } from "@/models/UserModel";
import DbConnection from "@/lib/DbConnection";

export default async function regihandlerster(req, res) {
  DbConnection();

  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(409).json({ message: "Wrong Credentials" });
    } else {
      if (password === existingUser.password) {
        return res.status(201).json({ user: existingUser });
      }
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
