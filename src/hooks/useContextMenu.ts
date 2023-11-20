import { useContextMenuStore } from "@/stores/contextMenuStore";
import { useEffect } from "react";

export type ContextMenuItem =
   | "separator"
   | {
        label: string;
        onClick: () => void;
        icon?: string;
        classNameIcon?: string;
        classNameText?: string;
     };

export const useContextMenu = (
   parentRef: React.RefObject<HTMLElement>,
   items: ContextMenuItem[] = []
) => {
   const { open } = useContextMenuStore();
   useEffect(() => {
      const handleContextMenu = (e: MouseEvent) => {
         if (e.shiftKey || !parentRef.current || !items || items.length === 0) {
            return;
         }
         e.preventDefault();
         console.time("contextMenu");
         open(e.pageX, e.pageY, items);
         console.timeEnd("contextMenu");
      };

      parentRef.current?.addEventListener("contextmenu", handleContextMenu);

      return () => {
         parentRef.current?.removeEventListener(
            "contextmenu",
            handleContextMenu
         );
      };
   }, [items, open, parentRef]);
};
