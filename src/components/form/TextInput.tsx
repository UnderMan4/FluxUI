import { mergeRefs } from "@/utils/mergeRef";
import { FC, useEffect, useRef } from "react";
import { AriaTextFieldOptions, useTextField } from "react-aria";
import { useFormContext } from "react-hook-form";
import { ErrorText } from "./shared/ErrorText";
import { useTranslation } from "react-i18next";
import { cls } from "@/utils/styles";

export type TextInputProps = Omit<
   AriaTextFieldOptions<"input">,
   "onChange" | "name"
> & {
   className?: string;
   name: string;
};

export const TextInput: FC<TextInputProps> = ({ className, ...props }) => {
   const { label, name } = props;
   const { t } = useTranslation();

   const { register, formState } = useFormContext();

   const error = formState.errors[name];

   useEffect(() => {
      console.log(formState.errors);
   }, [formState.errors]);
   const inputRef = useRef<HTMLInputElement>(null);
   const { ref, ...registerProps } = register(name);
   const { inputProps, labelProps } = useTextField(props, inputRef);

   return (
      <div className={cls("flex flex-col gap-[0.1rem]", className)}>
         <label
            className={cls("ml-1 text-sm font-bold text-slate-900", {
               "text-red-500": error,
            })}
            {...labelProps}
         >
            {label}
         </label>
         <input
            className={cls(
               "rounded-2xl border-2 border-b-4 border-slate-900 px-4 py-3",
               {
                  "border-red-500": error,
               }
            )}
            ref={mergeRefs(inputRef, ref)}
            {...inputProps}
            {...registerProps}
         />
         {error && (
            <ErrorText className="ml-1">
               {t(`errors.validation.${error?.message}`)}
            </ErrorText>
         )}
      </div>
   );
};
