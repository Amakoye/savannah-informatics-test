import { RegisterResponse } from "@models/api/auth";
import { User } from "@models/auth";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxGetUsers,
  reduxLoginUser,
  reduxLogoutUser,
} from "store/actions/auth";

type AuthState = {
  user: null | User;
  access_token: null | string;
  refresh_token: null | string;
  users: {
    loading: Loading;
    data: RegisterResponse[];
  };
};

const initialState: AuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
  users: {
    loading: false,
    data: [],
  },
};

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Login and refresh tokens below
      .addCase(reduxLoginUser.fulfilled, (state, { payload }) => {
        state.access_token = payload.access;
        state.refresh_token = payload.refresh;
        state.user = null;
      })
      // Get Users
      .addCase(reduxGetUsers.fulfilled, (state, { payload }) => {
        state.users = {
          data: [...payload],
          loading: false,
        };
      })
      .addCase(reduxGetUsers.pending, (state) => {
        state.users = {
          ...state.users,
          loading: true,
        };
      })
      .addCase(reduxGetUsers.rejected, (state) => {
        state.users = {
          ...state.users,
          loading: "error",
        };
      })
      // Logout user
      .addCase(reduxLogoutUser, (state) => {
        state.access_token = null;
        state.refresh_token = null;
        state.user = null;
        state.users = {
          loading: false,
          data: [],
        };
      });
  },
});

export default auth.reducer;
