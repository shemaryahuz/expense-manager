import { readFile, writeFile } from "fs/promises";
import bcrypt from "bcrypt";

const PATH = "./database/users.json"; // relative to server.js

export async function readUsers() {
    const users = await readFile(PATH, "utf-8");
    return JSON.parse(users);
};

export async function writeUsers(users) {
    await writeFile(PATH, JSON.stringify(users, null, 2));
};

export async function getUsers(req, res) {
    try {
        const usersJson = await readUsers();
        if (usersJson.length === 0) {
            return res.status(404).send({ message: "Users not found" });
        }
        res.send(usersJson);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function getUser(req, res) {
    try {
        const id = req.userId;
        const usersJson = await readUsers();
        const user = usersJson.find((user) => user.id === id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        user.passwordHash = undefined;
        res.send({ user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function updateUser(req, res) {
    try {
        const id = req.userId;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).send({ message: "Name and email are required" });
        }

        const usersJson = await readUsers();

        const updatedUser = usersJson.find((user) => user.id === id);
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        updatedUser.name = name;
        updatedUser.email = email;

        await writeUsers(usersJson);

        updateUser.passwordHash = undefined;
        res.send({ user: updatedUser, message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function updateUserPassword(req, res) {
    try {
        const id = req.userId;
        const { password } = req.body;

        if (!password) {
            return res.status(400).send({ message: "Password is required"});
        }

        const usersJson = await readUsers();

        const updatedUser = usersJson.find((user) => user.id === id);

        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        updatedUser.passwordHash = hashedPassword;

        await writeUsers(usersJson);

        updateUser.passwordHash = undefined;
        res.send({ user: updatedUser, message: "Password updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.userId;

        const usersJson = await readUsers();

        const deleted = usersJson.find((user) => user.id === id);
        if (!deleted) {
            return res.status(404).send("User not found");
        }

        const newUsers = usersJson.filter((user) => user.id !== id);
        await writeUsers(newUsers);

        res.send({ message: "User deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}