import DbConnection from "@/lib/DbConnection";
import { OrderModel } from "@/models/OrderModel";

export default async function regihandlerster(req, res) {
  DbConnection();

  if (req.method === "GET") {
    let orders = await OrderModel.find();

    if (orders.length < 0) {
      return res.status(404).json({ message: "No Orders found" });
    }

    return res.status(200).json(orders);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
