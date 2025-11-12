import { readFile, writeFile } from "fs/promises";
import { readTransactions, writeTransactions } from "./transactionsController.js";
const PATH = "./database/categories.json"; // relative to server.js
const MISCELLANEOUS_ID = "c1";

async function readCategories() {
    const categories = await readFile(PATH, "utf-8");
    return JSON.parse(categories);
};

async function writeCategories(categories) {
    await writeFile(PATH, JSON.stringify(categories, null, 2));
};

export async function getCategories(req, res) {
    try {
        const { userId } = req.params;
        const categoriesJson = await readCategories();
        const categories = categoriesJson.filter((category) => category.userId === userId || category.userId === null);
        if (categories.length === 0) {
            return res.status(404).send("Categories not found");
        }
        
        res.send(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
} 

export async function addCategory(req, res) {
    try {
        const newCategory = req.body;
        if (!newCategory.name || !newCategory.userId) {
            return res.status(400).send("Category name and user id are required");
        }
        const categoriesJson = await readCategories();
        newCategory.id = Date.now().toString();
        categoriesJson.push(newCategory);
        await writeCategories(categoriesJson);
        res.send(newCategory);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        const categoriesJson = await readCategories();

        // update category transactions to miscellaneous or income
        const transactionsJson = await readTransactions();
        const updatedTransactions = transactionsJson.map((transaction) => {
            if (transaction.categoryId === id) {
                transaction.categoryId = MISCELLANEOUS_ID;
            }
            return transaction;
        });
        await writeTransactions(updatedTransactions);

        const deleted = categoriesJson.find((category) => category.id === id);

        if (deleted.userId === null) {
            return res.status(400).send("Cannot delete default categories");
        }

        const newCategories = categoriesJson.filter((category) => category.id !== id);
        await writeCategories(newCategories);
        res.send(deleted);
    } catch (error) {
        res.status(500).send(error);
    }
}