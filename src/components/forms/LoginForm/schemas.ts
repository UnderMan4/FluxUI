import { z } from "zod";

export const loginSchema = z.object({
   username: z.string().min(1, "common.fieldNotEmpty"),
   password: z.string().min(1, "common.fieldNotEmpty"),
});
