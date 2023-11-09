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
   Color("#f44336"),
   Color("#f34881"),
   Color("#9c27b0"),
   Color("#673ab7"),
   Color("#3f51b5"),
   Color("#2196f3"),
   Color("#03a9f4"),
   Color("#00bcd4"),
   Color("#009688"),
   Color("#4caf50"),
   Color("#8bc34a"),
   Color("#cddc39"),
   Color("#ffeb3b"),
   Color("#ffc107"),
   Color("#ff9800"),
   Color("#ff5722"),
];

export const Tag: FC<TagProps> = ({ className, children, onClick }) => {
   const colorId = hashCode(children) % colors.length;

   const color = colors[colorId];

   return (
      <button
         className={cls(
            "flex h-5 items-center justify-center rounded-lg border-2 px-1 text-sm",
            {
               "cursor-pointer": !!onClick,
               "cursor-default": !onClick,
            },
            className
         )}
         style={{
            backgroundColor: color?.hex(),
            borderColor: color?.darken(0.2).hex(),
            color: getTextColor(color ?? white).hex(),
         }}
         onClick={onClick}
      >
         {children}
      </button>
   );
};
