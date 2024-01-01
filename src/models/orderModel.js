import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: [
      {
        type: mongoose.isObjectIdOrHexString,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "New order",
      enum: [
        "New order",
        "Processing",
        "Shipped",
        "Delivered",
        "Success",
        "Cancel",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
