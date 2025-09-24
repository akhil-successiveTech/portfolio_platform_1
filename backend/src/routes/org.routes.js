import { Router } from "express";
import { createExperience, uploadDocument, getOrgExperiences } from "../controllers/org.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.use(authMiddleware, roleMiddleware(["organisation"]));

router.post("/experiences", createExperience);
router.get("/experiences", getOrgExperiences);
router.post("/experiences/:experienceId/docs", upload.single("file"), uploadDocument);

export default router;
