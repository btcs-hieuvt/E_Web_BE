import productModel from "../models/productModel.js";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      subDescription,
      price,
      priceSale,
      category,
      quantity,
      images,
      shipping,
    } = req.body;

    console.log("aaaaaa", req.fields);

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !subDescription:
        return res.status(500).send({ error: "subDescription is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case !images:
        return res.status(500).send({ error: "images is required" });
      // case !shipping:
      //   return res.status(500).send({ error: "shipping is required" });
    }

    const product = new productModel({ ...req.body, slug: slugify(name) });
    await product.save();

    return res.status(200).send({
      success: true,
      message: "New product created",
      result: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};
