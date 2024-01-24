export type UserToken = {
  user_id: string;
  exp: number;
  type: UserTokenType;
};

export type User = {
  id: string;
  username: string;
  name: string | null;
  email: string;
};

export type UserTokenType = "access" | "refresh";
