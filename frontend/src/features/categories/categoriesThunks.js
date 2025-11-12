import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CATEGORIES_URL = "http://localhost:3000/api/categories";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        const url = `${CATEGORIES_URL}/u1` // u1 = user id
        const res = await axios.get(url);
        return res.data
    },
)

export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async (category) => {
        const body = {
            ...category,
            userId: "u1", // u1 = user id
        }
        const res = await axios.post(CATEGORIES_URL, body);
        return res.data
    },
)

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id) => {
        const res = await axios.delete(`${CATEGORIES_URL}/${id}`);
        return res.data;
    },
)