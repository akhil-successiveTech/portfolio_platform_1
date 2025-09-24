import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  filename: String,
  path: String,
  mimetype: String,
  size: Number,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  experience: { type: mongoose.Schema.Types.ObjectId, ref: "Experience" },
}, { timestamps: true });

export default mongoose.model("Document", documentSchema);
