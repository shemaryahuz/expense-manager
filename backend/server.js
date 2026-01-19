import express from "express";
import "dotenv/config";

import routes from "./src/routes/routes.js";
import middlewares from "./src/middlewares/middlewares.js";

const PORT = process.env.PORT || 3000;

const app = express();

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}

middlewares(app);

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
