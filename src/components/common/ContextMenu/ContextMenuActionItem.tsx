import { useContextMenuStore } from "@/stores/contextMenuStore";
import { cls } from "@/utils/styles";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, useCallback } from "react";

export type ContextMenuActionItemProps = {
   label: string;
   className?: string;
   icon?: string;
   reserveIconSpace?: boolean;
   onClick?: () => void;
   classNameText?: string;
   classNameIcon?: string;
};

export const ContextMenuActionItem: FC<ContextMenuActionItemProps> = ({
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
      <button
         className={cls(
            "flex h-9 flex-row items-center rounded-md px-3 hover:bg-slate-100",
            {
               "pl-0": reserveIconSpace,
            },
            className
         )}
         onClick={handleClick}
      >
         {reserveIconSpace && (
            <div className="flex aspect-square h-full items-center pl-1">
               {icon && (
                  <Icon icon={icon} height={20} className={classNameIcon} />
               )}
            </div>
         )}
         <span className={classNameText}>{label}</span>
      </button>
   );
};
