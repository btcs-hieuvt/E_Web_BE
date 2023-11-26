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

export const getProductController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const total = await productModel.countDocuments();

    const totalPages = Math.ceil(total / limit);

    const products = await productModel
      .find({})
      .populate("category")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).send({
      success: true,
      message: "get product successfully",
      result: {
        data: products,
        totalPage: totalPages,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get product",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");

    return res.status(200).send({
      success: true,
      message: "get a product successfully",
      result: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get a product",
      error,
    });
  }
};

export const deleteProdutController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    return res.status(200).send({
      success: true,
      message: "delete a product successfully",
      result: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete a product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
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

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.body,
        slug: slugify(name),
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "New product created",
      result: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while update a product",
      error,
    });
  }
};
