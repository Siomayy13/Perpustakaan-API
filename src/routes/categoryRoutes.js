import { Router } from "express";
import {
  getCategories, getLoansByCategory
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", getCategories);
router.get("/:status", getLoansByCategory);

export default router;