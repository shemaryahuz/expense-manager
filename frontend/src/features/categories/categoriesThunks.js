import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CATEGORY_URL } from "../../constants/api/urlConstants";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(CATEGORY_URL);

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
            const res = await axios.post(CATEGORY_URL, category);

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
            const res = await axios.put(`${CATEGORY_URL}/${category.id}`, category);

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
            const res = await axios.delete(`${CATEGORY_URL}/${id}`);

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