import { z } from "zod";

export const mangaStatusSchema = z.object({
  name: z.string().min(1, "Asar holati nomi bo'lishi shart"),
});

export type MangaStatusSchema = z.infer<typeof mangaStatusSchema>;
