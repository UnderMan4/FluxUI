import { cls } from "@/utils/styles";
import { FC } from "react";

export type CardProps = {
   className?: string;
   children?: React.ReactNode | React.ReactNode[];
   label?: string;
};

export const Card: FC<CardProps> = ({ className, children, label }) => {
   return (
      <div
         className={cls(
            "rounded-3xl  bg-white p-8 shadow-md",
            "flex flex-col gap-4",
            {
               "pt-5": label,
            },
            className
         )}
      >
         {label && <h2 className="text-2xl font-bold">{label}</h2>}
         <div className="">{children}</div>
      </div>
   );
};
