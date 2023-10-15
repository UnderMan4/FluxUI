import { useAppForm } from "@/hooks/useAppForm";
import { FC } from "react";
import { z } from "zod";

export const Login: FC = () => {
   const form = useAppForm({
      username: z.string().min(0),
      password: z.string().min(0),
   });
   return <div className="">Login</div>;
};
