import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { decodeToken, isExpired } from "utils/auth";

const authStateSelector = (state: State) => state.auth;

export const selectAuthUser = createDraftSafeSelector(
  authStateSelector,
  (state) => {
    const isAuthenticated =
      !!state.access_token && !isExpired(state.access_token);

    const _user = decodeToken(state.access_token);

    return {
      access_token: state.access_token,
      refresh_token: state.refresh_token,
      user: state.user,
      user_id: _user?.user_id,
      isAuthenticated,
    };
  }
);

export const selectUsers = createDraftSafeSelector(
  authStateSelector,
  (state) => {
    const users = state.users?.data;
    const loading = state.users?.loading;

    return {
      users,
      loading,
    };
  }
);
