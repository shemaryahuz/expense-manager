import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUser, login, logout, signup, updateUser } from "./userThunks";


export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        success: "",
        error: "",
        // only used when user is not logged in
        authLoading: false,
        authError: "", 
    },
    reducers: {
        clearMessages: (state) => {
            state.error = "";
            state.success = "";
        }
    },
    extraReducers: (builder) => {
        builder
            // signup thunk
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                const { user, message } = action.payload;
                state.user = user;
                state.success = message;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // login thunk
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                const { user, message } = action.payload;
                state.user = user;
                state.success = message;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // get user thunk
            .addCase(getUser.pending, (state) => {
                state.authLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                const { user } = action.payload;
                state.user = user;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                if (action.payload === null) return; // ignore error when user is not logged in
                state.authError = action.payload || action.error.message;
            })

            // update user thunk
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const { user, message } = action.payload;
                state.user = user;
                state.success = message;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // delete user thunk
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { message } = action.payload;
                state.success = message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // logout thunk
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.success = action.payload.message;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

// selectors
export const selectUserState = (state) => state.user;
export const selectUser = (state) => selectUserState(state).user;
export const selectIsAuthenticated = (state) => selectUserState(state).isAuthenticated;

// actions
export const { clearMessages } = userSlice.actions;

export default userSlice.reducer;