import { createTransaction, deleteTransactionById, findTransactionsByMonth, findUserTransactions, searchTransactionsByTitle, updateTransactionById } from "../dal/transactionsDAL.js";


export async function getTransactions(req, res) {
    try {
        const userId = req.userId;
        const transactions = await findUserTransactions(userId);

        if (!transactions) {
            return res.status(404).send({ message: "Transactions not found" });
        }

        res.send(transactions);

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function getTransactionsByMonth(req, res) {
    try {
        const userId = req.userId;
        const { year, month } = req.params;

        const transactions = await findTransactionsByMonth(userId, year, month);

        if (!transactions) {
            return res.status(404).send({ message: "Transactions not found" });
        }

        res.send(transactions);

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function searchTransactions(req, res) {
    try {

        const userId = req.userId;
        const { title } = req.query;

        const searchTerm = title.toLowerCase().trim() || '';

        const transactions = await searchTransactionsByTitle(userId, searchTerm);

        if (!transactions) {
            return res.status(404).send({ message: "Transactions not found" });
        }

        res.send(transactions);

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function addTransaction(req, res) {
    try {
        const userId = req.userId;
        const { categoryId, title, type, amount, date } = req.body;

        if (!userId || !title || !type || !amount || !date || !categoryId) {
            return res.status(400).send({ message: "Transaction title, amount, user id and category id are required" });
        }

        const newTransaction = await createTransaction({
            userId,
            categoryId,
            title,
            type,
            amount,
            date
        })

        if (!newTransaction) {
            return res.status(500).send({ message: "Something went wrong" });
        }

        res.send({ transaction: newTransaction, message: "Transaction added successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function updateTransaction(req, res) {
    try {

        const userId = req.userId;
        const { id } = req.params;
        const { categoryId, title, type, amount, date } = req.body;

        if (!userId || !title || !type || !amount || !date) {
            return res.status(400).send({ message: "Transaction title, amount, user id and category id are required" });
        }

        const updatedTransaction = await updateTransactionById(id, {
            categoryId,
            title,
            type,
            amount,
            date
        })

        if (!updatedTransaction) {
            return res.status(500).send({ message: "Something went wrong" });
        }

        res.send({ transaction: updatedTransaction, message: "Transaction updated successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;

        const deleted = await deleteTransactionById(id);

        if (!deleted) {
            return res.status(404).send({ message: "Transaction not found" });
        }

        res.send({ id, message: "Transaction deleted successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}