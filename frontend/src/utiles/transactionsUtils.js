import { MISCELLANEOUS_ID } from "../constants/features/categoriesConstants";

export const convertDatesToLocale = (transactions) =>
    transactions.map((transaction) => {
        const date = new Date(transaction.date);
        return {
            ...transaction,
            date: date.toLocaleDateString(),
        };
    });

export const updateTransaction = (transactions, updatedTransaction) => {
    updateTransaction.date = new Date(updatedTransaction.date).toLocaleDateString();
    return transactions.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction);
}


export const sortTransactionsByDate = (transactions) =>
    transactions.sort((prevTransaction, nextTransaction) =>
        new Date(nextTransaction.date) - new Date(prevTransaction.date));

export const updateTransactionsOnCategoryDelete = (transactions, categoryId) =>
    transactions.map((transaction) =>
        transaction.categoryId === categoryId ? { ...transaction, categoryId: MISCELLANEOUS_ID } : transaction);

export const getTotalAmount = (transactions) =>
    transactions.reduce((total, transaction) => total + transaction.amount, 0);