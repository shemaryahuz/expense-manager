import express from "express";

import {
    getTransactionsByMonth,
    addTransaction, 
    deleteTransaction,
    getTransactionsByCategory, 
    searchTransactions, 
    getTransactions,
    updateTransaction
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/:userId", getTransactions);
router.get("/month/:userId/:year/:month", getTransactionsByMonth);
router.get("/category/:userId/:categoryId", getTransactionsByCategory);
router.get("/search/:userId", searchTransactions);

router.post("/", addTransaction);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

export default router;