import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./src/routes/authRouter.js";
import usersRouter from "./src/routes/usersRouter.js";
import transactionsRouter from "./src/routes/transactionsRouter.js";
import categoriesRouter from "./src/routes/categoriesRouter.js";

const CLIENT_URL = env.CLIENT_URL || "http://localhost:5173";
const PORT = env.PORT || 3000;

const app = express();

app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/", (req, res) => res.sendStatus(404));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
