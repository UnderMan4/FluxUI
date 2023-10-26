import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { TextInput } from "@/components/TextInput";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Form } from "../components/Form";

export const Login: FC = () => {
   const { t } = useTranslation();

   return (
      <div className="grid min-h-screen w-full place-items-center bg-slate-100">
         <Card label={t("screens.login.header")}>
            <Form
               className="flex w-72 flex-col gap-4"
               schema={z.object({
                  username: z.string().min(0),
                  password: z.string().min(0),
               })}
            >
               <TextInput label={t("screens.login.username")} name="username" />
               <TextInput label={t("screens.login.password")} name="password" />
               <Button></Button>
            </Form>
         </Card>
      </div>
   );
};
