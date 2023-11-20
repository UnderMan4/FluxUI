import { ContextMenuActionItem } from "@/components/common/ContextMenu/ContextMenuActionItem";
import { ContextMenuSeparator } from "@/components/common/ContextMenu/ContextMenuSeparator";
import { useContextMenuStore } from "@/stores/contextMenuStore";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useLayoutEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useOnClickOutside } from "usehooks-ts";

export type ContextMenuProps = {
   className?: string;
};

type ContextMenuStyle = {
   left?: number;
   top?: number;
   right?: number;
   bottom?: number;
};

export const ContextMenu: FC<ContextMenuProps> = ({ className }) => {
   const { close, isOpen, items, x, y } = useContextMenuStore();
   const ref = useRef<HTMLDivElement>(null);

   const [style, setStyle] = useState<ContextMenuStyle>({});

   useOnClickOutside(ref, close);

   const reserveIconSpace = items?.some(
      (item) => item != "separator" && item.icon
   );

   useLayoutEffect(() => {
      if (!isOpen || !ref.current?.offsetHeight || !ref.current.offsetHeight)
         return;

      const rightSpace = document.documentElement.scrollWidth - x;
      const bottomSpace = document.documentElement.scrollHeight - y;
      const newStyle: ContextMenuStyle = {};

      if (bottomSpace < ref.current.offsetHeight) {
         newStyle.top = y - ref.current.offsetHeight;
      } else {
         newStyle.top = y;
      }

      if (rightSpace < ref.current.offsetWidth) {
         newStyle.left = x - ref.current.offsetWidth;
      } else {
         newStyle.left = x;
      }

      setStyle(newStyle);
   }, [x, y]);

   return (
      <AnimatePresence>
         {isOpen && items && (
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 40 }}
               transition={{ duration: 0.1 }}
               key={`${x}-${y}`}
               ref={ref}
               className={twMerge(
                  "absolute z-[9999] flex  max-h-[30rem] max-w-xs flex-col gap-1 rounded-xl bg-white p-2 shadow-lg",
                  className
               )}
               style={style}
            >
               {items.map((item, i) => {
                  if (item === "separator") {
                     return <ContextMenuSeparator key={i} />; //NOSONAR
                  }
                  return (
                     <ContextMenuActionItem
                        key={i} //NOSONAR
                        {...item}
                        reserveIconSpace={reserveIconSpace}
                     />
                  );
               })}
            </motion.div>
         )}
      </AnimatePresence>
   );
};
