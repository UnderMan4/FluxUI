import { ContextMenuActionItem } from "@/components/common/ContextMenu/ContextMenuActionItem";
import { ContextMenuSeparator } from "@/components/common/ContextMenu/ContextMenuSeparator";
import { useContextMenuStore } from "@/stores/useContextMenuStore";
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

   return isOpen ? (
      <div
         ref={ref}
         className={twMerge(
            "absolute z-[9999] flex flex-col rounded-xl bg-red-500 p-3",
            className
         )}
         style={style}
      >
         {items.map((item, i) => {
            if (item === "separator") {
               return <ContextMenuSeparator key={i} />;
            }
            return (
               <ContextMenuActionItem
                  key={i}
                  onClick={item.onClick}
                  icon={item.icon}
                  label={item.label}
               />
            );
         })}
      </div>
   ) : null;
};
