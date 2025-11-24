import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}