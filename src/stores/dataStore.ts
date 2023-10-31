import { create } from "zustand";
import Cookies from "js-cookie";

export type DataStoreState = {
   isLoggedIn: boolean;
   logIn: () => void;
   logOut: () => void;
};

export const useDataStore = create<DataStoreState>((set) => ({
   isLoggedIn: false,
   logIn: () => set({ isLoggedIn: true }),
   logOut: () => {
      set({ isLoggedIn: false });
      Cookies.remove("SID");
   },
}));
