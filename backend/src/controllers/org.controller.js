import Experience from "../models/Experience.js";
import Document from "../models/Document.js";

export const createExperience = async (req, res) => {
  try {
    const { studentId, title, description, startDate, endDate } = req.body;
    const experience = new Experience({
      organisation: req.user._id,
      student: studentId,
      title,
      description,
      startDate,
      endDate,
    });
    await experience.save();
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const file = req.file;

    const doc = new Document({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      uploadedBy: req.user._id,
      experience: experienceId,
    });
    await doc.save();

    await Experience.findByIdAndUpdate(experienceId, { $push: { documents: doc._id } });

    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrgExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ organisation: req.user._id }).populate("student");
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
