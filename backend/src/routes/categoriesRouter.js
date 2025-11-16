import express from "express";

import { getCategories, addCategory, deleteCategory, updateCategory } from "../controllers/categoriesController.js";

const router = express.Router();

router.get("/:userId", getCategories);

router.post("/", addCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;