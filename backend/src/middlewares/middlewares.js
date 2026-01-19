import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorHandler } from "./errorHandler.js";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const middlewares = (app) => {
    app.use(cors({ credentials: true, origin: CLIENT_URL }));
    app.use(cookieParser());
    app.use(express.json());

    app.use(errorHandler);
};

export default middlewares;