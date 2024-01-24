export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  username: string;
  password: string;
  email: string;
  re_password: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
};

export type RegisterResponse = {
  name: string;
  username: string;
  email: string;
  id: number;
};
