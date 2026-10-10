import { Router } from "express";
import {
  getCustomers, addCustomer, editCustomer, removeCustomer
} from "../controllers/customerController.js";

const router = Router();

router.get("/", getCustomers);
router.post("/", addCustomer);
router.put("/:id", editCustomer);
router.delete("/:id", removeCustomer);

export default router;