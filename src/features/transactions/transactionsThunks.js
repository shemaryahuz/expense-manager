import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TRANSACTION_URL = "http://localhost:3000/api/transactions";

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async () => {
        const url = `${TRANSACTION_URL}/u1` // u1 = user id
        const res = await axios.get(url);
        const formated = res.data.map((transaction) => {
            const date = new Date(transaction.date);
            return {
                ...transaction,
                date: date.toLocaleDateString(),
            }
        })
        return formated;
    },
)

export const fetchTransactionsByMonth = createAsyncThunk(
    "transactions/fetchTransactionsByMonth",
    async () => {
        const url = `${TRANSACTION_URL}/month/u1/${new Date().getFullYear()}/${new Date().getMonth()}` // u1 = user id
        const res = await axios.get(url);
        const formated = res.data.map((transaction) => {
            const date = new Date(transaction.date);
            return {
                ...transaction,
                date: date.toLocaleDateString(),
            }
        })
        return formated;
    },
)

export const searchTransactions = createAsyncThunk(
    "transactions/searchTransactions",
    async (search) => {
        const url = `${TRANSACTION_URL}/search/u1?query=${search}` // u1 = user id
        const res = await axios.get(url);
        const formated = res.data.map((transaction) => {
            const date = new Date(transaction.date);
            return {
                ...transaction,
                date: date.toLocaleDateString(),
            }
        })
        return formated;
    },
)

export const addTransaction = createAsyncThunk(
    "transactions/addTransaction",
    async (transaction) => {
        const body = {
            ...transaction,
            userId: "u1", // u1 = user id
        }
        const res = await axios.post(TRANSACTION_URL, body);
        return res.data
    },
)

export const deleteTransaction = createAsyncThunk(
    "transactions/deleteTransaction",
    async (id) => {
        const res = await axios.delete(`${TRANSACTION_URL}/${id}`);
        console.log(res.data)
        return res.data
    },
)