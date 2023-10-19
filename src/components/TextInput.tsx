import { useAppForm } from "@/hooks/useAppForm";
import { FC, useId, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { type AriaTextFieldProps, useTextField } from "react-aria";
import { UseFormReturn, useForm } from "react-hook-form";

export type TextInputProps = Omit<AriaTextFieldProps, "name"> & {
   className?: string;
} & (
      | {
           form: UseFormReturn;
           name: string;
        }
      | {
           form?: never;
           name?: string;
        }
   );
// Omit<HTMLInputElement, ""> & {
//    label: string;

//    className?: string;
//    id?: string;
// }

export const TextInput: FC<TextInputProps> = ({
   className,
   form,
   ...props
}) => {
   const { label, name } = props;
   const {} = form;
   const inputRef = useRef<HTMLInputElement>(null);

   const { descriptionProps, errorMessageProps, inputProps, labelProps } =
      useTextField(props, inputRef);
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
            ref={inputRef}
            {...inputProps}
         />
      </div>
   );
};
