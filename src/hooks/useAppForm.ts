import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useAppForm = (
   schema: z.ZodRawShape,
   defaultValues?: { [x: string]: unknown }
) => {
   const s = z.object(schema);
   const form = useForm<z.infer<typeof s>>({
      defaultValues: defaultValues,
      resolver: zodResolver(s),
      mode: "onChange",
   });
   return form;
};
