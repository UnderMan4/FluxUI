import { useContextMenuStore } from "@/stores/contextMenuStore";
import { cls } from "@/utils/styles";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, useCallback } from "react";
import { motion } from "framer-motion";
import Color from "color";

export type ContextMenuActionItemProps = {
   id: string;
   label: string;
   className?: string;
   icon?: string;
   reserveIconSpace?: boolean;
   onClick?: () => void;
   classNameText?: string;
   classNameIcon?: string;
};
const bgColor = Color("rgb(241 245 249)");

export const ContextMenuActionItem: FC<ContextMenuActionItemProps> = ({
   id,
   className,
   label,
   icon,
   onClick,
   reserveIconSpace,
   classNameIcon,
   classNameText,
}) => {
   const { close, closeOnClick } = useContextMenuStore();

   const handleClick = useCallback(() => {
      onClick?.();
      if (closeOnClick) close();
   }, [closeOnClick, onClick]);
   return (
      <motion.button
         className={cls(
            "flex h-9 flex-row items-center rounded-md px-3 ",
            {
               "pl-0": reserveIconSpace,
            },
            className
         )}
         initial={{ backgroundColor: bgColor.alpha(0).hexa() }}
         whileHover={{
            backgroundColor: bgColor.hex(),
         }}
         whileTap={{ backgroundColor: bgColor.darken(0.05).hex() }}
         transition={{ duration: 0.1 }}
         onClick={handleClick}
         key={`${id}-button`}
      >
         {reserveIconSpace && (
            <div className="flex aspect-square h-full items-center pl-1">
               {icon && (
                  <Icon icon={icon} height={20} className={classNameIcon} />
               )}
            </div>
         )}
         <span className={classNameText}>{label}</span>
      </motion.button>
   );
};
