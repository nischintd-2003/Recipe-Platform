import type { User } from "../interfaces/auth.interface";

const STORAGE_KEYS = {
  TOKEN: "authToken",
  USER: "authUser",
};

export const storage = {
  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  setToken: (token: string) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  clearToken: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  getUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};
