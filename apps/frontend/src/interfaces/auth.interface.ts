export type User = {
  id: number;
  email: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
};

export type AuthAction =
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "LOGOUT" }
  | { type: "INITIALIZE"; payload: { user: User; token: string } };

export type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export type AuthMode = "login" | "signup";

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
};
