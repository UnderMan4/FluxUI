import { cls } from "@/utils/styles";
import { FC } from "react";

export type CardProps = {
   className?: string;
   children?: React.ReactNode | React.ReactNode[];
   label?: string;
   containerClassName?: string;
};

export const Card: FC<CardProps> = ({
   className,
   children,
   label,
   containerClassName,
}) => {
   return (
      <div
         className={cls(
            "rounded-3xl  bg-white p-8 shadow-md",
            "flex flex-col gap-4",
            {
               "pt-5": label,
            },
            containerClassName
         )}
      >
         {label && <h2 className="text-2xl font-bold">{label}</h2>}
         <div className={className}>{children}</div>
      </div>
   );
};
