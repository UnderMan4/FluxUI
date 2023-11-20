import { FC } from "react";
import { cls } from "@/utils/styles";
import { hashCode } from "@/utils/hash";
import Color from "color";

export type TagProps = {
   className?: string;
   children: string;
   onClick?: () => void;
};

type TagColors = {
   bg: Color;
   fg: Color;
};
const colors: TagColors[] = [
   {
      bg: Color("#f44336").lighten(0.6),
      fg: Color("#f44336"),
   },
   {
      bg: Color("#f34881").lighten(0.5),
      fg: Color("#f34881"),
   },
   {
      bg: Color("#9c27b0").lighten(0.99),
      fg: Color("#9c27b0"),
   },
   {
      bg: Color("#673ab7").lighten(0.7),
      fg: Color("#673ab7"),
   },
   {
      bg: Color("#3f51b5").lighten(0.7),
      fg: Color("#3f51b5"),
   },
   {
      bg: Color("#2196f3").lighten(0.7),
      fg: Color("#2196f3"),
   },
   {
      bg: Color("#03a9f4").lighten(0.8),
      fg: Color("#03a9f4"),
   },
   {
      bg: Color("#00bcd4").lighten(0.99),
      fg: Color("#05a7bd"),
   },
   {
      bg: Color("#4bc9bc").lighten(0.4),
      fg: Color("#009688"),
   },
   {
      bg: Color("#4caf50").lighten(0.8),
      fg: Color("#4caf50"),
   },
   {
      bg: Color("#8bc34a").lighten(0.7),
      fg: Color("#8bc34a"),
   },
   {
      bg: Color("#ffc107").lighten(0.8),
      fg: Color("#f3b90b"),
   },
   {
      bg: Color("#ff9800").lighten(0.8),
      fg: Color("#ff9800"),
   },
   {
      bg: Color("#ff5722").lighten(0.6),
      fg: Color("#ff5722"),
   },
];

export const Tag: FC<TagProps> = ({ className, children, onClick }) => {
   const colorId = hashCode(children) % colors.length;

   const color = colors[colorId];

   return (
      <button
         className={cls(
            "flex items-center justify-center rounded-3xl border-2 px-2 text-sm/4 font-bold",
            {
               "cursor-pointer": !!onClick,
               "cursor-default": !onClick,
            },
            className
         )}
         style={{
            backgroundColor: color?.bg.hex(),
            borderColor: color?.fg.hex(),
            color: color?.fg.hex(),
         }}
         onClick={onClick}
      >
         {children}
      </button>
   );
};
