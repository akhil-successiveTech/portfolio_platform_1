import Experience from "../models/Experience.js";

export const getPublicPortfolio = async (req, res) => {
  try {
    const { studentId } = req.params;
    const experiences = await Experience.find({
      student: studentId,
      status: "accepted",
    }).populate("organisation documents");

    res.json({ studentId, experiences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
