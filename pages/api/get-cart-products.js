import DbConnection from "@/lib/DbConnection";
import { ProductModel } from "@/models/ProductModel";

export default async function handle(req, res) {
  await DbConnection();
  const ids = req.body.ids;
  res.json(await ProductModel.find({ _id: ids }));
}
