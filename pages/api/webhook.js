const stripe = require("stripe")(
  "sk_test_51P2eJBSGrXgNH2CcxVGtmURl4sBP0ao99rzdPlfUiEpWIkFzEyoezc5j166nJGravEO2r5ysznrvON4oD9YQ53qJ00gvkc3EMZ"
);
import { buffer } from "micro";
import DbConnection from "@/lib/DbConnection";
import { OrderModel } from "@/models/OrderModel";

const endpointSecret =
  "whsec_908021a6bafcd03bbfe0d36fe42dfed9863c5b85d60416f58194da8ebe5ee521";

export default async function handler(req, res) {
  await DbConnection();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await OrderModel.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};
