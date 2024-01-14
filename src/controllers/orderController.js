import orderModel from "../models/orderModel.js";

export const getOrderController = async (req, res) => {
  try {
    const order = await orderModel
      .find({ buyer: req.user._id })
      .populate({
        path: "product.id",
        model: "Products",
        select: "name price priceSale images",
      })
      .populate("buyer");

    return res.json(order);
  } catch (error) {}
};
