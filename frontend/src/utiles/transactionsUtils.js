import { MISCELLANEOUS_ID } from "../constants/features/categoriesConstants";

export const convertDatesToLocale = (transactions, locale = "en-US") =>
    transactions.map((transaction) => {
        const date = new Date(transaction.date);
        return {
            ...transaction,
            date: date.toLocaleDateString(locale),
        };
    });

export const updateTransaction = (transactions, updatedTransaction, locale = "en-US") => {
    updatedTransaction.date = new Date(updatedTransaction.date).toLocaleDateString(locale);
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