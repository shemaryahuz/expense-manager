import express from "express";

import routes from "./src/routes/routes.js";
import middlewares from "./src/middlewares/middlewares.js";

const PORT = process.env.PORT || 3000;

const app = express();

middlewares(app);

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
