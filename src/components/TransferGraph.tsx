import { FC } from "react";
import { twMerge } from "tailwind-merge";

export interface TransferGraphProps {
   className?: string;
}

export const TransferGraph: FC<TransferGraphProps> = ({ className }) => {
   return (
      <div
         className={twMerge(
            "h-40 w-full rounded-2xl bg-white p-2 shadow-inner shadow-slate-500",
            className
         )}
      >
         TransferGraph
      </div>
   );
};
