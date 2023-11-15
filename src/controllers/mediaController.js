import cloudinary from "cloudinary";
import Media from "../models/mediaModel.js";

cloudinary.v2.config({
  cloud_name: "dmfvth7q3",
  api_key: "372228582781784",
  api_secret: "j2iF0d1zqstAC3xuYehAxS0qN_k",
});

export const uploadMedia = async (req, res) => {
  try {
    const files = req.files;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "No files uploaded", result: null });
    }

    const uploadPromises = files.map((file) => {
      return cloudinary.uploader.upload(file.path).then((result) => {
        // Xử lý kết quả từ Cloudinary

        return result;
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    const imageURLs = uploadResults.map((result) => result.url);

    return res.status(200).send({
      success: true,
      message: "upload successfully",
      result: imageURLs,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in upload media",
      error,
    });
  }
};
