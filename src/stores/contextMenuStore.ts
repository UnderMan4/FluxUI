import { ContextMenuItem } from "@/hooks";
import { create } from "zustand";

export type ContextMenuState = {
   isOpen: boolean;
   x: number;
   y: number;
};

export type ContextMenuStoreState = {
   A: ContextMenuState;
   B: ContextMenuState;
   items: ContextMenuItem[];
   closeOnClick: boolean;
   open: (
      x: number,
      y: number,
      items: ContextMenuItem[],
      closeOnClick: boolean
   ) => void;
   close: () => void;
};

export const useContextMenuStore = create<ContextMenuStoreState>()((set) => ({
   A: { isOpen: false, x: 0, y: 0 },
   B: { isOpen: false, x: 0, y: 0 },
   items: [],
   closeOnClick: false,
   open: (x, y, items, closeOnClick) => {
      if (items.length === 0) return;
      set(({ A, B }) => {
         if (A.isOpen || B.isOpen) {
            return {
               A: { isOpen: !A.isOpen, x, y },
               B: { isOpen: !B.isOpen, x, y },
               items,
               closeOnClick: closeOnClick,
            };
         } else {
            return {
               A: { isOpen: true, x, y },
               items,
               closeOnClick: closeOnClick,
            };
         }
      });
   },
   close: () => {
      console.log("close");
      set({
         A: { isOpen: false, x: 0, y: 0 },
         B: { isOpen: false, x: 0, y: 0 },
         items: [],
      });
   },
}));
