import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  organisation: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
}, { timestamps: true });

export default mongoose.model("Experience", experienceSchema);
