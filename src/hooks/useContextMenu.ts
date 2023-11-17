import {
   ContextMenuItem,
   useContextMenuStore,
} from "@/stores/useContextMenuStore";
import { useEffect } from "react";

export const useContextMenu = (
   parentRef: React.RefObject<HTMLElement>,
   items: ContextMenuItem[]
) => {
   const { open } = useContextMenuStore();
   useEffect(() => {
      const handleContextMenu = (e: MouseEvent) => {
         if (e.shiftKey) {
            return;
         }
         e.preventDefault();

         open(e.pageX, e.pageY, items);
      };

      parentRef.current?.addEventListener("contextmenu", handleContextMenu);

      return () => {
         parentRef.current?.removeEventListener(
            "contextmenu",
            handleContextMenu
         );
      };
   }, []);
};
