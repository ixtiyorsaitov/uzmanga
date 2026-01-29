import { z } from "zod";

export const loginSchema = z.object({
  loginOrEmail: z.string().min(3, "Majburiy maydon"),
  password: z.string().min(6, "Majburiy maydon"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Emailni kiriting").email("Yaroqsiz email"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
