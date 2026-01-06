import bcrypt from "bcrypt";

import { readTransactions, writeTransactions } from "./transactionsController.js";
import { readCategories, writeCategories } from "./categoriesController.js";
import { deleteUserById, findUserByEmail, findUserById, findUsers, updateUserPassword, updateUserProfile } from "../dal/usersDAL.js";

export async function getUsers(req, res) {
    try {
        const users = await findUsers();
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function getUser(req, res) {
    try {
        const id = req.userId;
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
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

        const currentUser = await findUserById(id);

        if (!currentUser) {
            return res.status(404).send({ message: "User not found" });
        }

        if (currentUser.email !== email) {
            const existingUser = await findUserByEmail(email);
            if (existingUser) {
                return res.status(409).send({ message: "Email already exists" });
            }
        }

        const updatedUser = await updateUserProfile(id, { name, email });

        if (!updatedUser) {
            return res.status(500).send({ message: "Something went wrong" });
        }

        res.send({ user: updatedUser, message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function updatePassword(req, res) {
    try {
        const id = req.userId;
        const { password } = req.body;

        if (!password) {
            return res.status(400).send({ message: "Password is required" });
        }

        const currentUser = await findUserById(id);

        if (!currentUser) {
            return res.status(404).send({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await updateUserPassword(id, { passwordHash: hashedPassword });

        if (!updatedUser) {
            return res.status(500).send({ message: "Something went wrong" });
        }

        res.send({ user: updatedUser, message: "Password updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.userId;

        const deleted = await deleteUserById(id);

        if (!deleted) {
            return res.status(500).send({ message: "Something went wrong" });
        }

        // delete user from categories
        const categoriesJson = await readCategories();
        const newCategories = categoriesJson.filter((category) => category.userId !== id);
        await writeCategories(newCategories);

        // delete user from transactions
        const transactionsJson = await readTransactions();
        const newTransactions = transactionsJson.filter((transaction) => transaction.userId !== id);
        await writeTransactions(newTransactions);

        res.send({ message: "User deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}