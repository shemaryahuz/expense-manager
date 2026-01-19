import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { AUTH_URL, USER_URL } from "../../constants/api/urlConstants";

export const signup = createAsyncThunk(
    "user/signup",
    async (user, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${AUTH_URL}/signup`, user);

            return res.data;

        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Signup failed";

            return rejectWithValue(message);
        }
    },
)

export const login = createAsyncThunk(
    "user/login",
    async (user, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${AUTH_URL}/login`, user);

            return res.data;

        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Login failed";

            return rejectWithValue(message);
        }
    },
)

export const getUser = createAsyncThunk(
    "user/getUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${USER_URL}/me`);

            return res.data;

        } catch (error) {
            const isAuthError = error.response?.status === 401;

            return rejectWithValue({ isAuthError });
        }
    },
)

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (user, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${USER_URL}/me`, user);

            return res.data;

        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Update user failed";

            return rejectWithValue(message);
        }
    },
)

export const updateUserPassword = createAsyncThunk(
    "user/updateUserPassword",
    async (password, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${USER_URL}/me/password`, password);

            return res.data;

        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Update user password failed";

            return rejectWithValue(message);
        }
    },
)

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${USER_URL}/me`);

            return res.data;

        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Delete user failed";

            return rejectWithValue(message);
        }
    },
)

export const logout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${AUTH_URL}/logout`);

            return res.data;

        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Logout failed";

            return rejectWithValue(message);
        }
    },
)