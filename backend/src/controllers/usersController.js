import { readFile, writeFile } from "fs/promises";
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
            return res.status(404).send("Users not found");
        }
        res.send(usersJson);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function getUser(req, res) {
    try {
        const id = req.userId;
        const usersJson = await readUsers();
        const user = usersJson.find((user) => user.id === id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.userId;
        const usersJson = await readUsers();
        const deleted = usersJson.find((user) => user.id === id);
        const newUsers = usersJson.filter((user) => user.id !== id);
        await writeUsers(newUsers);
        res.send(deleted);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}