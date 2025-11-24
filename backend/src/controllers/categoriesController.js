import { readFile, writeFile } from "fs/promises";

import { readTransactions, writeTransactions } from "./transactionsController.js";

const PATH = "./database/categories.json"; // relative to server.js

const INCOME_ID = "c0";
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

        const userId = req.userId;

        const categoriesJson = await readCategories();

        const categories = categoriesJson.filter((category) =>
            category.userId === userId || category.userId === null);

        if (categories.length === 0) {
            return res.status(404).send({ message: "Categories not found" });
        }

        res.send(categories);

    } catch (error) {

        console.error(error);        
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function addCategory(req, res) {
    try {
        const userId = req.userId;
        const { name } = req.body;

        if (!name || !userId) {
            return res.status(400).send({ message: "Category name and user id are required" });
        }

        const categoriesJson = await readCategories();

        const id = Date.now().toString();
        const newCategory = { id, name, userId };

        categoriesJson.push(newCategory);
        await writeCategories(categoriesJson);
        res.send({ category: newCategory, message: "Category added successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function updateCategory(req, res) {
    try {

        const { id } = req.params;
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).send({ message: "Category name is required" });
        }

        const categoriesJson = await readCategories();

        const updatedCategory = categoriesJson.find((category) => category.id === id);

        if (!updatedCategory) {
            return res.status(404).send({ message: "Category not found" });
        }

        const updatedCategories = categoriesJson.map((category) => {
            if (category.id === id) {
                category.name = name;
            }
            return category;
        });

        await writeCategories(updatedCategories);

        res.send({ category: updatedCategory, message: "Category updated successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
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

        if (!deleted) {
            return res.status(404).send({ message: "Category not found" });
        }

        if (deleted.userId === null) {
            return res.status(400).send({ message: "Cannot delete default categories" });
        }

        const newCategories = categoriesJson.filter((category) => category.id !== id);

        await writeCategories(newCategories);

        res.send({ id, message: "Category deleted successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}