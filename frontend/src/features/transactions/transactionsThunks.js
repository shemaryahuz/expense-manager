import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const TRANSACTION_URL = "/transactions";

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async (date = new Date(), { rejectWithValue }) => {

        try {
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            const url = `${TRANSACTION_URL}/month/${year}/${month}`
            const res = await axios.get(url);

            const formated = res.data.map((transaction) => {
                const date = new Date(transaction.date);
                return {
                    ...transaction,
                    date: date.toLocaleDateString(),
                }
            })
            return formated;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Get transactions failed";

            return rejectWithValue(message);
        }
    },
)

export const fetchCategoriesTransactions = createAsyncThunk(
    "transactions/fetchCategoriesTransactions",
    async (date = new Date(), { rejectWithValue }) => {

        try {
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            const url = `${TRANSACTION_URL}/month/${year}/${month}`
            const res = await axios.get(url);

            const formated = res.data.map((transaction) => {
                const date = new Date(transaction.date);
                return {
                    ...transaction,
                    date: date.toLocaleDateString(),
                }
            })
            return formated;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Get transactions failed";

            return rejectWithValue(message);
        }
    },
)

export const searchTransactions = createAsyncThunk(
    "transactions/searchTransactions",
    async (search, { rejectWithValue }) => {

        try {
            const encodedSearch = encodeURIComponent(search);
            const url = `${TRANSACTION_URL}/search?title=${encodedSearch}`
            const res = await axios.get(url);
    
            const formated = res.data.map((transaction) => {
                const date = new Date(transaction.date);
                return {
                    ...transaction,
                    date: date.toLocaleDateString(),
                }
            })
            return formated;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Get transactions failed";

            return rejectWithValue(message);
        }
    },
)

export const addTransaction = createAsyncThunk(
    "transactions/addTransaction",
    async (transaction, { rejectWithValue }) => {

        try {
            const res = await axios.post(TRANSACTION_URL, transaction);
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Add transaction failed";

            return rejectWithValue(message);
        }
    },
)

export const editTransaction = createAsyncThunk(
    "transactions/editTransaction",
    async (transaction, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${TRANSACTION_URL}/${transaction.id}`, transaction);
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Edit transaction failed";

            return rejectWithValue(message);
        }
    },
)

export const deleteTransaction = createAsyncThunk(
    "transactions/deleteTransaction",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${TRANSACTION_URL}/${id}`);
            return res.data
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Delete transaction failed";

            return rejectWithValue(message);
        };
    },
)