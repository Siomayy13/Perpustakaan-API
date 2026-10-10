import { Router } from "express";
import {
  getLoans, getLoan, addLoan, editLoan, removeLoan
} from "../controllers/loanController.js";

const router = Router();

router.get("/", getLoans);
router.get("/:id", getLoan);
router.post("/", addLoan);
router.put("/:id", editLoan);
router.delete("/:id", removeLoan);

export default router;