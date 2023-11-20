import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type ContextMenuSeparatorProps = {
   className?: string;
};

export const ContextMenuSeparator: FC<ContextMenuSeparatorProps> = ({
   className,
}) => {
   return (
      <div className={twMerge("my-1 h-[1px] w-full bg-slate-100", className)} />
   );
};
