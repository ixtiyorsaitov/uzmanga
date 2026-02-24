import { z } from "zod";

export const mangaTypeSchema = z.object({
  name: z.string().min(1, "Manga turi nomi bo'lishi shart"),
});

export type MangaTypeSchema = z.infer<typeof mangaTypeSchema>;
