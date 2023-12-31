import { cls } from "@/utils/styles";
import { FC } from "react";

export type ProgressBarProps = {
   max: number;
   value: number;
   className?: string;
   progressClassName?: string;
};

export const ProgressBar: FC<ProgressBarProps> = ({
   className,
   max,
   value,
   progressClassName,
}) => {
   return (
      <div className={cls("h-2 w-52 overflow-hidden bg-white", className)}>
         <div
            className={cls("h-full bg-green-500", progressClassName)}
            style={{ width: `${(value / max) * 100}%` }}
         />
      </div>
   );
};
