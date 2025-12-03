import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUser, login, logout, signup, updateUser } from "./userThunks";
import { STATUSES } from "../../constants/features/statusConstants";

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUSES;

const initialState = {
    user: null,
    isAuthenticated: false,

    fetchStatus: IDLE,
    actionStatus: IDLE,

    fetchError: null,
    actionError: null,

    successMessage: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.fetchError = null;
            state.actionError = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // signup thunk
            .addCase(signup.pending, (state) => {
                state.actionStatus = LOADING;
            })
            .addCase(signup.fulfilled, (state, action) => {
                const { user, message } = action.payload;

                state.actionStatus = SUCCEEDED;
                state.isAuthenticated = true;
                state.user = user;
                state.successMessage = message;
            })
            .addCase(signup.rejected, (state, action) => {
                state.actionStatus = FAILED;
                state.actionError = action.payload || action.error.message;
            })

            // login thunk
            .addCase(login.pending, (state) => {
                state.actionStatus = LOADING;
            })
            .addCase(login.fulfilled, (state, action) => {
                const { user, message } = action.payload;

                state.actionStatus = SUCCEEDED;
                state.isAuthenticated = true;
                state.user = user;
                state.successMessage = message;
            })
            .addCase(login.rejected, (state, action) => {
                state.actionStatus = FAILED;
                state.actionError = action.payload || action.error.message;
            })

            // get user thunk
            .addCase(getUser.pending, (state) => {
                state.fetchStatus = LOADING;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                const { user } = action.payload;

                state.fetchStatus = SUCCEEDED;
                state.isAuthenticated = true;
                state.user = user;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                // ignore error when user is not logged in
                if (action.payload) {
                    state.fetchStatus = FAILED;
                    state.fetchError = action.payload || action.error.message;
                }
            })

            // update user thunk
            .addCase(updateUser.pending, (state) => {
                state.actionStatus = LOADING;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const { user, message } = action.payload;

                state.actionStatus = SUCCEEDED;
                state.user = user;
                state.successMessage = message;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.actionStatus = FAILED;
                state.actionError = action.payload || action.error.message;
            })

            // delete user thunk
            .addCase(deleteUser.pending, (state) => {
                state.actionStatus = LOADING;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const { message } = action.payload;

                state.actionStatus = SUCCEEDED;
                state.successMessage = message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.actionStatus = FAILED;
                state.actionError = action.payload || action.error.message;
            })

            // logout thunk
            .addCase(logout.pending, (state) => {
                state.actionStatus = LOADING;
            })
            .addCase(logout.fulfilled, (state, action) => {
                const { message } = action.payload;

                state.actionStatus = SUCCEEDED;
                state.isAuthenticated = false;
                state.user = null;
                state.successMessage = message;
            })
            .addCase(logout.rejected, (state, action) => {
                state.actionStatus = FAILED;
                state.actionError = action.payload || action.error.message;
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