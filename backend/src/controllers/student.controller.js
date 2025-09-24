import Experience from "../models/Experience.js";

export const getStudentExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ student: req.user._id }).populate("organisation documents");
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const acceptExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const exp = await Experience.findOneAndUpdate(
      { _id: id, student: req.user._id },
      { status: "accepted" },
      { new: true }
    );
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const declineExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const exp = await Experience.findOneAndUpdate(
      { _id: id, student: req.user._id },
      { status: "declined" },
      { new: true }
    );
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
