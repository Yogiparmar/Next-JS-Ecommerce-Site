import DbConnection from "@/lib/DbConnection";
import { OrderModel } from "@/models/OrderModel";

export default async function deleteuser(req, res) {
  DbConnection();
  if (req.method === "DELETE") {
    const { id } = req.query; // Extract ID from req.query instead of req.body

    if (!id) {
      return res.status(400).json({ message: "Please provide the Order ID" });
    } else {
      await OrderModel.deleteOne({ _id: id })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Order not found" });
          }
          return res
            .status(200)
            .json({ message: "Order deleted successfully" });
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
