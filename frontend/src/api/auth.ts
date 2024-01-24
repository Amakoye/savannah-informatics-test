import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@models/api/auth";
import api from "./api";

export const apiLoginUser = (data: LoginPayload) =>
  api
    .post<LoginResponse>("/jwt/create/", data)
    .then((response) => response.data);

export const apiRegisterUser = (data: RegisterPayload) =>
  api.post<RegisterResponse>("/users/", data).then((response) => response.data);

export const apiGetUsers = () =>
  api.get<RegisterResponse[]>("/user/all/").then((response) => response.data);
