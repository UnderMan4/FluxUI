import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

export type ContextMenuSeparatorProps = {
   className?: string;
};

export const ContextMenuSeparator: FC<ContextMenuSeparatorProps> = ({
   className,
}) => {
   return <div className={twMerge("", className)}>ContextMenuSeparator</div>;
};
