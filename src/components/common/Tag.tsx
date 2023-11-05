import { FC } from "react";
import { cls } from "@/utils/styles";
import { hashCode } from "@/utils/hash";
import Color from "color";
import { getTextColor, white } from "@/utils/colors";

export type TagProps = {
   className?: string;
   children: string;
   onClick?: () => void;
};

const colors = [
   Color("#dc2626"),
   Color("#ea580c"),
   Color("#ca8a04"),
   Color("#16a34a"),
   Color("#0d9488"),
   Color("#0284c7"),
   Color("#4f46e5"),
   Color("#9333ea"),
   Color("#db2777"),
];

export const Tag: FC<TagProps> = ({ className, children, onClick }) => {
   const colorId = hashCode(children) % colors.length;

   const color = colors[colorId];

   return (
      <button
         className={cls(
            "flex h-6 items-center justify-center rounded-lg border-2 px-2 text-sm",
            {
               "cursor-pointer": !!onClick,
               "cursor-default": !onClick,
            },
            className
         )}
         style={{
            backgroundColor: color?.hex(),
            borderColor: color?.darken(0.1).hex(),
            color: getTextColor(color ?? white).hex(),
         }}
         onClick={onClick}
      >
         {children}
      </button>
   );
};
