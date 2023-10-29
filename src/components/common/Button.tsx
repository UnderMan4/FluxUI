import { cls } from "@/utils/styles";
import { FC, useRef } from "react";
import { AriaButtonOptions, useButton } from "react-aria";

export type ButtonProps = AriaButtonOptions<"button"> & {
   className?: string;
   children?: string;
};

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
   const buttonRef = useRef<HTMLButtonElement>(null);
   const { buttonProps } = useButton(props, buttonRef);
   return (
      <button
         className={cls(
            "rounded-2xl bg-indigo-500 p-3 font-bold uppercase text-white",
            className
         )}
         ref={buttonRef}
         {...buttonProps}
      >
         {children}
      </button>
   );
};
