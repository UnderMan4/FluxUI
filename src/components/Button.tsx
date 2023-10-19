import { cls } from "@/utils/styles";
import { FC } from "react";

export type ButtonProps = {
   className?: string;
};

export const Button: FC<ButtonProps> = ({ className }) => {
   return <div className={cls("", className)}>Button</div>;
};
