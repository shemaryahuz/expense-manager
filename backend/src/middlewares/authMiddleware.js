import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).send({ message: "You are not authorized, Please log in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
}