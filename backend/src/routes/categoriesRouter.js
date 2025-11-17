import express from "express";

import { getCategories, addCategory, deleteCategory, updateCategory } from "../controllers/categoriesController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getCategories);

router.post("/", authMiddleware, addCategory);

router.put("/:id", authMiddleware, updateCategory);

router.delete("/:id", authMiddleware, deleteCategory);

export default router;