import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = "/users";
const AUTH_URL = "/auth";

export const signup = createAsyncThunk(
    "user/signup",
    async (user) => {
        const res = await axios.post(`${AUTH_URL}/signup`, user);
        return res.data
    },
)

export const login = createAsyncThunk(
    "user/login",
    async (user) => {
        const res = await axios.post(`${AUTH_URL}/login`, user);
        return res.data
    },
)

export const getUser = createAsyncThunk(
    "user/getUser",
    async () => {
        const res = await axios.get(`${USER_URL}/me`);
        return res.data
    },
)

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (user) => {
        const res = await axios.put(`${USER_URL}/${user.id}`, user);
        return res.data
    },
)

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id) => {
        const res = await axios.delete(`${USER_URL}/${id}`);
        return res.data
    },
)

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        const res = await axios.post(`${AUTH_URL}/logout`);
        return res.data
    },
)