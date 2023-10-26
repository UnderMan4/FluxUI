import { FC, useId, useRef } from "react";
import { AriaTextFieldOptions, useTextField } from "react-aria";
import { useFormContext } from "react-hook-form";
import { mergeRefs } from "react-merge-refs";
import { twMerge } from "tailwind-merge";

export type TextInputProps = Omit<AriaTextFieldOptions<"input">, "onChange"> & {
   className?: string;
};

export const TextInput: FC<TextInputProps> = ({ className, ...props }) => {
   const id = useId();
   const { label, name } = props;

   const { register } = useFormContext();
   const inputRef = useRef<HTMLInputElement>(null);
   const { ref, ...registerProps } = register(name || id);
   const { inputProps, labelProps } = useTextField(props, inputRef);

   return (
      <div className={twMerge("flex flex-col gap-[0.1rem]", className)}>
         <label
            className="ml-1 text-sm font-bold text-slate-900"
            {...labelProps}
         >
            {label}
         </label>
         <input
            className="rounded-2xl border-2 border-b-4 border-slate-900 px-4 py-3"
            ref={mergeRefs([inputRef, ref])}
            {...inputProps}
            {...registerProps}
         />
      </div>
   );
};
