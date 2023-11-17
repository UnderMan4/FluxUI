import { create } from "zustand";

export type ContextMenuItem =
   | "separator"
   | {
        label: string;
        onClick: () => void;
        icon?: string;
     };

export type ContextMenuStoreState = {
   isOpen: boolean;
   x: number;
   y: number;
   items: ContextMenuItem[];
   open: (x: number, y: number, items: ContextMenuItem[]) => void;
   close: () => void;
};

export const useContextMenuStore = create<ContextMenuStoreState>((set) => ({
   isOpen: false,
   x: 0,
   y: 0,
   items: [],
   open: (x, y, items) => set({ isOpen: true, x, y, items }),
   close: () => set({ isOpen: false, x: 0, y: 0, items: [] }),
}));
