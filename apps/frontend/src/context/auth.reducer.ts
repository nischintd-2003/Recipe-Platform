import type { AuthAction, AuthState } from "../interfaces/auth.interface";

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return initialAuthState;
    default:
      return state;
  }
}
