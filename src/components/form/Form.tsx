import { useAppForm } from "@/hooks/useAppForm";
import { ReactElement } from "react";
import { DefaultValues, FieldErrors, FormProvider } from "react-hook-form";
import { z } from "zod";

export type FormProps<T extends z.ZodRawShape> = {
   schema: z.ZodObject<T>;
   onSubmit: (
      data: z.infer<z.ZodObject<T>>,
      event?: React.BaseSyntheticEvent
   ) => void;
   onSubmitError?: (errors: FieldErrors<z.infer<z.ZodObject<T>>>) => void;
   children?: ReactElement | ReactElement[];
   className?: string;
   defaultValues?: DefaultValues<z.infer<z.ZodObject<T>>>;
};

export const Form = <T extends z.ZodRawShape>({
   className,
   children,
   schema,
   defaultValues,
   onSubmit,
   onSubmitError,
}: FormProps<T>) => {
   const form = useAppForm(schema, defaultValues);
   const { handleSubmit } = form;

   return (
      <FormProvider {...form}>
         <form
            className={className}
            onSubmit={handleSubmit(onSubmit, onSubmitError)}
         >
            {children}
         </form>
      </FormProvider>
   );
};
