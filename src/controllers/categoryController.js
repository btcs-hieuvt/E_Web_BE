import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name, thumbnail } = req.body;

    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Category name is required",
        result: null,
      });
    }
    if (!thumbnail) {
      return res.status(401).send({
        success: false,
        message: "thumpnail is required",
        result: null,
      });
    }
    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "category name already Exisits",
        result: null,
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
      thumbnail,
    }).save();

    return res.status(200).send({
      success: true,
      message: "New category created",
      result: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error create category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name, thumbnail } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
        thumbnail,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Update category successfully",
      result: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error update category",
      error,
    });
  }
};

export const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    return res.status(200).send({
      success: true,
      message: "Get all category successfully",
      result: categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error get all category",
      error,
    });
  }
};

export const getOneCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    return res.status(200).send({
      success: true,
      message: "Get acategory successfully",
      result: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error get a category",
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Delete a category successfully",
      result: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while delete a category",
      error,
    });
  }
};
