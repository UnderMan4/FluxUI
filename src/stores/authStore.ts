import Cookies from "js-cookie";
import { create } from "zustand";

export type AuthStoreState = {
   isLoggedIn: boolean;
   logIn: () => void;
   logOut: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
   isLoggedIn: false,
   logIn: () => set({ isLoggedIn: true }),
   logOut: () => {
      set({ isLoggedIn: false });
      Cookies.remove("SID");
   },
}));
