import { useAppForm } from "@/hooks/useAppForm";
import { ReactElement } from "react";
import { DefaultValues, FormProvider } from "react-hook-form";
import { z } from "zod";

export type FormProps<T extends z.ZodRawShape> = {
   schema: z.ZodObject<T>;
   onSubmit?: (data: DefaultValues<z.infer<z.ZodObject<T>>>) => void;
   children?: ReactElement | ReactElement[];
   className?: string;
   defaultValues?: DefaultValues<z.infer<z.ZodObject<T>>>;
};

export const Form = <T extends z.ZodRawShape>({
   className,
   children,
   schema,
   defaultValues,
}: FormProps<T>) => {
   const form = useAppForm(schema, defaultValues);
   return (
      <FormProvider {...form}>
         <form className={className} action="">
            {children}
         </form>
      </FormProvider>
   );
};
