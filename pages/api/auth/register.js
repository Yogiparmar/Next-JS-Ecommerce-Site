import { UserModel } from "@/models/UserModel";
import DbConnection from "@/lib/DbConnection";

export default async function regihandlerster(req, res) {
  DbConnection();

  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      const user = await UserModel.create({ name, email, password });
      await user.save();
      return res.status(201).json({ user: user });
    } else {
      return res.status(409).json({ message: "Email already exists" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

