import { readFile, writeFile } from "fs/promises";

const PATH = "./database/transactions.json"; // relative to server.js

export async function readTransactions() {
    const transactions = await readFile(PATH, "utf-8");
    return JSON.parse(transactions);
};

export async function writeTransactions(transactions) {
    await writeFile(PATH, JSON.stringify(transactions, null, 2));
};

export async function getTransactions(req, res) {
    try {
        const userId = req.userId;
        const transactions = await readTransactions();

        const filtered = transactions.filter((transaction) => transaction.userId === userId);
        filtered.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        res.send(filtered);

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function getTransactionsByMonth(req, res) {
    try {
        const userId = req.userId;
        const { year, month } = req.params;

        const transactionsJson = await readTransactions();

        const filtered = transactionsJson.filter((transaction) => {

            const date = new Date(transaction.date);

            return transaction.userId === userId &&
                date.getFullYear() === Number(year) &&
                date.getMonth() + 1 === Number(month);
        });

        filtered.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        res.send(filtered);

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

        const transactionsJson = await readTransactions();

        const filtered = transactionsJson.filter((transaction) =>
            transaction.userId === userId &&
            transaction.title.toLowerCase().includes(searchTerm)
        );

        res.send(filtered);

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

        const newTransaction = {
            id: Date.now().toString(),
            userId,
            categoryId,
            title,
            type,
            amount,
            date
        };

        const transactionsJson = await readTransactions();
        transactionsJson.push(newTransaction);
        await writeTransactions(transactionsJson);

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

        const updatedTransaction = {
            id,
            userId,
            categoryId,
            title,
            type,
            amount,
            date
        };

        const transactionsJson = await readTransactions();

        const updatedTransactions = transactionsJson.map((transaction) => {
            if (transaction.id === id) {
                return updatedTransaction;
            }
            return transaction;
        });

        await writeTransactions(updatedTransactions);

        res.send({ transaction: updatedTransaction, message: "Transaction updated successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}

export async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;

        const transactionsJson = await readTransactions();

        const deleted = transactionsJson.find((transaction) => transaction.id === id);

        if (!deleted) {
            return res.status(404).send({ message: "Transaction not found" });
        }

        const updatedTransactions = transactionsJson.filter((transaction) => transaction.id !== id);

        await writeTransactions(updatedTransactions);

        res.send({ id, message: "Transaction deleted successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: error.message || "Something went wrong" });
    }
}