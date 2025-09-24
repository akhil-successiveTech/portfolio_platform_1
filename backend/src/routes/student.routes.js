import { Router } from "express";
import { getStudentExperiences, acceptExperience, declineExperience } from "../controllers/student.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

router.use(authMiddleware, roleMiddleware(["student"]));

router.get("/experiences", getStudentExperiences);
router.post("/experiences/:id/accept", acceptExperience);
router.post("/experiences/:id/decline", declineExperience);

export default router;
