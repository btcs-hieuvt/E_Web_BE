import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: [
      {
        id: {
          type: mongoose.ObjectId,
          ref: "Products",
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
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
