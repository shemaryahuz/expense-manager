import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { readUsers, writeUsers } from "./usersController.js";

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "Name, email and password are required" });
        }

        const usersJson = await readUsers();

        const existingUser = usersJson.find((user) => user.email === email);

        if (existingUser) {
            return res.status(409).send({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { id: Date.now().toString(), email, name, passwordHash: hashedPassword };
        usersJson.push(newUser);
        await writeUsers(usersJson);

        const payload = { id: newUser.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 1000 * 60 * 60 }); 

        newUser.passwordHash = undefined;
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

        const usersJson = await readUsers();

        const user = usersJson.find((user) => user.email === email);
        if (!user) {
            return res.status(401).send({ message: "User not found"});
        }
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) {
            return res.status(401).send({ message: "Invalid password" });
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 1000 * 60 * 60 });

        user.passwordHash = undefined;
        res.send({  user, message: "You are logged in successfully" });

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