import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { creatUser, findUserByEmail } from "../dal/usersDAL.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(401).send({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
        return res.status(401).send({ message: "Invalid password" });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60
    };

    res.cookie("token", token, cookieOptions);

    user.passwordHash = undefined;
    res.send({ user, message: "You are logged in successfully" });
});

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: "Name, email and password are required" });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return res.status(409).send({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await creatUser({
        name,
        email,
        passwordHash: hashedPassword
    });

    if (!newUser) {
        return res.status(500).send({ message: "Something went wrong" });
    }

    const payload = { id: newUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60
    };

    res.cookie("token", token, cookieOptions);

    newUser.passwordHash = undefined;
    res.send({ user: newUser, message: "You are signed up successfully" });
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.send({ message: "You are logged out successfully" });
});