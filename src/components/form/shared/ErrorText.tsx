import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type ErrorTextProps = {
   className?: string;
   children?: string;
};

export const ErrorText: FC<ErrorTextProps> = ({ className, children }) => {
   return (
      <p className={twMerge("text-xs font-bold text-red-500", className)}>
         {children}
      </p>
   );
};
