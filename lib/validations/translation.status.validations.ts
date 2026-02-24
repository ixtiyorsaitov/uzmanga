import { z } from "zod";

export const translationStatusSchema = z.object({
  name: z.string().min(1, "Tarjima holati nomi bo'lishi shart"),
});

export type TranslationStatusSchema = z.infer<typeof translationStatusSchema>;
