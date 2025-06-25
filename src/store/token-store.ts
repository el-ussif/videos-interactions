import { create } from "zustand";

interface TokenState {
  token: number;
  totalToken: number;
  setToken: (value: number) => void;
  addToken: (value: number) => void;
}

const useTokenStore = create<TokenState>((set, get) => ({
  token: 0,
  totalToken: 0,
  setToken: (value: number) => set({ token: value }),
  setTotalToken: (value: number) => set({ totalToken: value }),
  addToken: (value: number) => set({ token: get().token + value }),
}));

export default useTokenStore;
