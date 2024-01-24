import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@models/api/auth";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetUsers, apiLoginUser, apiRegisterUser } from "api/auth";
import { isAxiosError } from "axios";

export const reduxLogoutUser = createAction("LOGOUT_USER");

export const reduxLoginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  "LOGIN_USER",
  async ({ email, password }, { rejectWithValue }) => {
    return await apiLoginUser({ email, password }).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue({});
    });
  }
);

export const reduxRegisterUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload
>(
  "REGISTER_USER",
  async (
    { username, password, re_password, email, name },
    { rejectWithValue }
  ) => {
    return await apiRegisterUser({
      username,
      password,
      re_password,
      email,
      name,
    }).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue({});
    });
  }
);

export const reduxGetUsers = createAsyncThunk<RegisterResponse[]>(
  "GET_USERS",
  async (_, { rejectWithValue }) => {
    return await apiGetUsers().catch((e) => {
      if (isAxiosError(e)) return rejectWithValue({});
    });
  }
);

//export const reduxLoginUser = createAsyncThunk("LOGIN_USER", apiLoginUser);
//types
