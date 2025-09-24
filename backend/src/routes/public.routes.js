import { Router } from "express";
import { getPublicPortfolio } from "../controllers/public.controller.js";

const router = Router();

router.get("/portfolio/:studentId", getPublicPortfolio);

export default router;
