import mongoose from "mongoose";

const mediaSchema = mongoose.Schema({
  filename: String,
  url: String,
});

export default mongoose.model("Media", mediaSchema);
