import express from "express";

import {
    getTransactionsByMonth,
    addTransaction, 
    deleteTransaction,
    searchTransactions, 
    getTransactions,
    updateTransaction
} from "../controllers/transactionsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTransactions);
router.get("/month/:year/:month", authMiddleware, getTransactionsByMonth);
router.get("/search", authMiddleware, searchTransactions);

router.post("/", authMiddleware, addTransaction);

router.put("/:id", authMiddleware, updateTransaction);

router.delete("/:id", authMiddleware, deleteTransaction);

export default router;