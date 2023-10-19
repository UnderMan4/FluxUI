import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { TextInput } from "@/components/TextInput";
import { useAppForm } from "@/hooks/useAppForm";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export const Login: FC = () => {
   const form = useAppForm({
      username: z.string().min(0),
      password: z.string().min(0),
   });

   const { t } = useTranslation();

   return (
      <div className="grid min-h-screen w-full place-items-center bg-slate-100">
         <Card label={t("screens.login.header")}>
            <form className="flex w-72 flex-col gap-4">
               <TextInput
                  label={t("screens.login.username")}
                  form={form}
                  name="username"
               />
               <TextInput
                  label={t("screens.login.password")}
                  form={form}
                  name="password"
               />
               <Button></Button>
            </form>
         </Card>
      </div>
   );
};
