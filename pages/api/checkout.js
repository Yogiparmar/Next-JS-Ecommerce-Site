import DbConnection from "@/lib/DbConnection";
import { OrderModel } from "@/models/OrderModel";
import { ProductModel } from "@/models/ProductModel";
const stripe = require("stripe")(
  "sk_test_51P2eJBSGrXgNH2CcxVGtmURl4sBP0ao99rzdPlfUiEpWIkFzEyoezc5j166nJGravEO2r5ysznrvON4oD9YQ53qJ00gvkc3EMZ"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    } = req.body;

    DbConnection();

    const productsIds = cartProducts;

    const uniqueIds = [...new Set(productsIds)];

    const productsInfos = await ProductModel.find({ _id: uniqueIds });

    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(
        (p) => p._id.toString() === productId
      );
      const quantity =
        productsIds.filter((id) => id === productId)?.length || 0;
      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: "USD",
            product_data: { name: productInfo.name },
            unit_amount: quantity * productInfo.cost * 100,
          },
        });
      }
    }

    const orderDoc = await OrderModel.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: "http://localhost:3000" + "/cart?success=1",
      cancel_url: "http://localhost:3000" + "/cart?canceled=1",
      metadata: { orderId: orderDoc._id.toString(), test: "ok" },
    });

    return res.status(200).json({ url: session.url });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
