import { createSlice } from "@reduxjs/toolkit";

import { deleteUser, getUser, login, logout, signup, updateUser } from "./userThunks";
import { STATUSES } from "../../constants/features/statusConstants";

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUSES;

const initialState = {
    user: null,
    status: IDLE,
    message: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // signup thunk
            .addCase(signup.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(signup.fulfilled, (state, action) => {
                const { user, message } = action.payload;

                state.status = SUCCEEDED;
                state.user = user;
                state.message = message;
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // login thunk
            .addCase(login.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(login.fulfilled, (state, action) => {
                const { user, message } = action.payload;

                state.status = SUCCEEDED;
                state.user = user;
                state.message = message;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // get user thunk
            .addCase(getUser.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                const { user } = action.payload;

                state.status = SUCCEEDED;
                state.user = user;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = FAILED;
                if (action.payload?.isAuthError) state.user = null;
            })

            // update user thunk
            .addCase(updateUser.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const { user, message } = action.payload;

                state.status = SUCCEEDED;
                state.user = user;
                state.message = message;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // delete user thunk
            .addCase(deleteUser.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const { message } = action.payload;

                state.status = SUCCEEDED;
                state.message = message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // logout thunk
            .addCase(logout.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(logout.fulfilled, (state, action) => {
                const { message } = action.payload;

                state.status = SUCCEEDED;
                state.user = null;
                state.message = message;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            });
    },
});

// selectors
export const selectUserState = (state) => state.user;
export const selectUser = (state) => selectUserState(state).user;
export const selectUserId = (state) => selectUserState(state).user?.id;
export const selectUserName = (state) => selectUserState(state).user?.name;

// actions
export const { clearMessage } = userSlice.actions;

export default userSlice.reducer;