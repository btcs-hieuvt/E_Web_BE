import userModel from "../models/userModel.js";

export const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find();

    return res.status(200).send({
      success: true,
      message: "",
      result: allUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error registering",
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const idUserDeleted = req.params.id;
    const user = await userModel.findByIdAndDelete(idUserDeleted);
    await userModel.deleteOne({})
    if (!user) {
      res.status(404).send({
        success: false,
        message: "user not found",
        result: null,
      });
    }
    res.status(200).send({
      success: true,
      message: "Delete user successful",
      result: null,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error registering",
      error,
    });
  }
};
