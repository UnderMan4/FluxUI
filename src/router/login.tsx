import { Card } from "@/components/common";
import { LoginForm } from "@/components/forms";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Login: FC = () => {
   const { t } = useTranslation();

   return (
      <div className="grid min-h-screen w-full place-items-center bg-slate-100">
         <Card label={t("screens.login.header")}>
            <LoginForm />
         </Card>
      </div>
   );
};
