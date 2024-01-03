import { StateCreator } from "zustand";

export interface AuthSlice {
  isAuth: boolean;
  setAuth: (changes: boolean) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = set => ({
  isAuth: false,
  setAuth: (changes: boolean) => set(state => ({ isAuth: changes })),
});