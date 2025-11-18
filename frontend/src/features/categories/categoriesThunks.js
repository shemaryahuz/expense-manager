import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CATEGORIES_URL = "/categories";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        const url = CATEGORIES_URL
        const res = await axios.get(url);
        return res.data
    },
)

export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async (category) => {
        const res = await axios.post(CATEGORIES_URL, category);
        return res.data
    },
)

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async (category) => {
        const res = await axios.put(`${CATEGORIES_URL}/${category.id}`, category);
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