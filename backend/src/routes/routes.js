import express from "express";

import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";
import transactionsRouter from "./transactionsRouter.js";
import categoriesRouter from "./categoriesRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/transactions", transactionsRouter);
router.use("/categories", categoriesRouter);

router.use("/", (req, res) => {
    res.status(404).send({ message: "Route not found" });
});

export default router;