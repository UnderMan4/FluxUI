import { ContextMenuActionItem } from "@/components/common/ContextMenu/ContextMenuActionItem";
import { ContextMenuSeparator } from "@/components/common/ContextMenu/ContextMenuSeparator";
import { useContextMenuStore } from "@/stores/contextMenuStore";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

export type ContextMenuProps = {
   id: "A" | "B";
   className?: string;
};

type ContextMenuStyle = {
   left?: number;
   top?: number;
   right?: number;
   bottom?: number;
};

export const ContextMenu: FC<ContextMenuProps> = ({ id }) => {
   const store = useContextMenuStore();
   const { close, items } = store;

   const ref = useRef<HTMLDivElement>(null);

   const [style, setStyle] = useState<ContextMenuStyle>({});

   useOnClickOutside(ref, (e) => {
      if ((e.button !== 2 && store[id]?.isOpen) || e.shiftKey) {
         close();
      }
   });

   useEffect(() => {
      return () => {
         console.log("unmount");
      };
   }, []);

   const reserveIconSpace = items?.some(
      (item) => item != "separator" && item.icon
   );

   useLayoutEffect(() => {
      if (
         !store[id]?.isOpen ||
         !ref.current?.offsetHeight ||
         !ref.current.offsetHeight
      )
         return;

      const rightSpace =
         document.documentElement.scrollWidth - (store[id]?.x || 0);
      const bottomSpace =
         document.documentElement.scrollHeight - (store[id]?.y || 0);
      const newStyle: ContextMenuStyle = {};

      if (bottomSpace < ref.current.offsetHeight) {
         newStyle.top = (store[id]?.y || 0) - ref.current.offsetHeight;
      } else {
         newStyle.top = store[id]?.y || 0;
      }

      if (rightSpace < ref.current.offsetWidth) {
         newStyle.left = (store[id]?.x || 0) - ref.current.offsetWidth;
      } else {
         newStyle.left = store[id]?.x || 0;
      }

      setStyle(newStyle);
   }, [store[id]?.x, store[id]?.y]);

   return (
      <motion.div ref={ref} style={style} className={"absolute z-[9999] "}>
         <AnimatePresence>
            {store[id]?.isOpen && (
               <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.1 }}
                  key={`${store[id]?.x}-${store[id]?.y}`}
                  className="flex  max-h-[30rem] max-w-xs flex-col gap-1 rounded-xl bg-white p-2 shadow-lg"
               >
                  {items.map((item, i) => {
                     if (item === "separator") {
                        return <ContextMenuSeparator key={i} />; //NOSONAR
                     }
                     return (
                        <ContextMenuActionItem
                           key={item.id}
                           {...item}
                           reserveIconSpace={reserveIconSpace}
                        />
                     );
                  })}
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
   );
};
