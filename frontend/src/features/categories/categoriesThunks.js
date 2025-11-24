import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CATEGORIES_URL = "/categories";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const url = CATEGORIES_URL
            const res = await axios.get(url);
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Get categories failed";

            return rejectWithValue(message);
        }
    },
)

export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async (category, { rejectWithValue }) => {
        try {
            const res = await axios.post(CATEGORIES_URL, category);
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Add category failed";

            return rejectWithValue(message);
        }
    },
)

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async (category, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${CATEGORIES_URL}/${category.id}`, category);
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Update category failed";

            return rejectWithValue(message);
        }
    },
)

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${CATEGORIES_URL}/${id}`);
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Delete category failed";

            return rejectWithValue(message);
        }
    },
)