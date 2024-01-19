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

export const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate({
        path: "product.id",
        model: "Products",
        select: "name price priceSale images",
      })
      .populate("buyer")
      .sort({ createdAt: "-1" });
    return res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
