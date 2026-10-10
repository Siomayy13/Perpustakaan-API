import { Router } from "express";
import {
  getProducts, addProduct, editProduct, removeProduct
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);

export default router;