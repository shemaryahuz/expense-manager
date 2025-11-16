import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const TRANSACTION_URL = "http://localhost:3000/api/transactions";

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async (date = new Date()) => {

        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const url = `${TRANSACTION_URL}/month/u1/${year}/${month}` // u1 = user id
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

export const fetchCategoriesTransactions = createAsyncThunk(
    "transactions/fetchCategoriesTransactions",
    async (date = new Date()) => {

        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const url = `${TRANSACTION_URL}/month/u1/${year}/${month}` // u1 = user id
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
        
        const encodedSearch = encodeURIComponent(search);
        const url = `${TRANSACTION_URL}/search/u1?title=${encodedSearch}` // u1 = user id
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

export const editTransaction = createAsyncThunk(
    "transactions/editTransaction",
    async (transaction) => {        
        const res = await axios.put(`${TRANSACTION_URL}/${transaction.id}`, transaction);
        return res.data
    },
)

export const deleteTransaction = createAsyncThunk(
    "transactions/deleteTransaction",
    async (id) => {
        const res = await axios.delete(`${TRANSACTION_URL}/${id}`);
        return res.data
    },
)