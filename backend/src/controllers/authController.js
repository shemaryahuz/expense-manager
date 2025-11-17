import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { readUsers, writeUsers } from "./usersController.js";

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send("Name, email and password are required");
        }

        const usersJson = await readUsers();

        const existingUser = usersJson.find((user) => user.email === email);

        if (existingUser) {
            return res.status(409).send("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { id: Date.now().toString(), email, name, passwordHash: hashedPassword };
        usersJson.push(newUser);
        await writeUsers(usersJson);

        const payload = { id: newUser.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 1000 * 60 * 60 }); 

        res.send({ message: "You are signed up successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        const usersJson = await readUsers();

        const user = usersJson.find((user) => user.email === email);
        if (!user) {
            return res.status(401).send("User not found");
        }
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) {
            return res.status(401).send("Invalid password");
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 1000 * 60 * 60 });

        res.send({ message: "You are logged in successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}