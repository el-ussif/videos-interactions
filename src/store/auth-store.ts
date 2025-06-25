import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email: string;
  isRegistered: boolean;
  setEmail: (email: string) => void;
  setIsRegistered: (isRegistered: boolean) => void;
  resetAuthState: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: "",
      isRegistered: false,
      setEmail: (email) => set({ email }),
      setIsRegistered: (isRegistered) => set({ isRegistered }),
      resetAuthState: () => set({ email: "", isRegistered: false }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
