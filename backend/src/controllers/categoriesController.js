import { createCategory, deleteCategoryById, findUserCategories, updateCategoryName } from "../dal/categoriesDAL.js";
import { readTransactions, writeTransactions } from "./transactionsController.js";

const MISCELLANEOUS_ID = "c1";

export async function getCategories(req, res) {
    try {

        const userId = req.userId;

        const categories = await findUserCategories(userId);

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

        const newCategory = await createCategory({ name, userId });

        if (!newCategory) {
            return res.status(500).send({ message: "Something went wrong" });
        }

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

        const updatedCategory = await updateCategoryName(id, { name });

        if (!updatedCategory) {
            return res.status(404).send({ message: "Category not found" });
        }

        res.send({ category: updatedCategory, message: "Category updated successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        // update category transactions to miscellaneous or income
        const transactionsJson = await readTransactions();

        const updatedTransactions = transactionsJson.map((transaction) => {
            if (transaction.categoryId === id) {
                transaction.categoryId = MISCELLANEOUS_ID;
            }
            return transaction;
        });

        await writeTransactions(updatedTransactions);

        const deleted = await deleteCategoryById(id);

        if (!deleted) {
            return res.status(404).send({ message: "Category not found" });
        }

        res.send({ id, message: "Category deleted successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}