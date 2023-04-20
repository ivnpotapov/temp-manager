export type User = {
  _id: string;
  login: string;
  name: string;
};
export type DecodedToken = {
  id: string;
  login: string;
};

export type SignupUserData = {
  name: string;
  login: string;
  password: string;
};

export type LoginUserData = Omit<SignupUserData, 'name'>;

export type TokenResponse = {
  token: string;
};
