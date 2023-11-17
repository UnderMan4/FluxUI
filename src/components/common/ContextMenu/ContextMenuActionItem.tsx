import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type ContextMenuActionItemProps = {
   className?: string;
   label: string;
   icon?: string;
   onClick?: () => void;
};

export const ContextMenuActionItem: FC<ContextMenuActionItemProps> = ({
   className,
   label,
}) => {
   return <div className={twMerge("", className)}>{label}</div>;
};
