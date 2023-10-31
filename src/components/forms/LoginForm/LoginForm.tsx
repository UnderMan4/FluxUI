import { Button } from "@/components/common";
import { Form, TextInput } from "@/components/form";
import { AuthService } from "@/services";
import { useDataStore } from "@/stores/dataStore";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export const LoginForm: FC = () => {
   const { t } = useTranslation();
   const { logIn } = useDataStore();
   return (
      <Form
         className="flex w-72 flex-col gap-4"
         schema={z.object({
            username: z.string().min(1, "common.fieldNotEmpty"),
            password: z.string().min(1, "common.fieldNotEmpty"),
         })}
         onSubmit={async (data) => {
            const res = await AuthService.login(data);
            if (res.data === "Ok.") {
               logIn();
            }
         }}
         onSubmitError={(errors) => {
            console.log(errors);
         }}
      >
         <TextInput label={t("screens.login.username")} name="username" />
         <TextInput label={t("screens.login.password")} name="password" />
         <Button className="mt-4" type="submit">
            {t("screens.login.login")}
         </Button>
      </Form>
   );
};
