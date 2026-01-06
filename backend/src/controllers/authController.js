import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { creatUser, findUserByEmail } from "../dal/usersDAL.js";

export async function signup(req, res) {
    try {
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

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 1000 * 60 * 60 });

        newUser.password_hash = undefined;
        res.send({ user: newUser, message: "You are signed up successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).send({ message: "Invalid password" });
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 1000 * 60 * 60 });

        user.password_hash = undefined;
        res.send({ user, message: "You are logged in successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("token");
        res.send({ message: "You are logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}