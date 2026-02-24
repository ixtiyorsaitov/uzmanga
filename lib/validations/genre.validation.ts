import { z } from "zod";

export const genreSchema = z.object({
  name: z.string().min(1, "Janr nomi bo'lishi shart"),
});

export type GenreSchema = z.infer<typeof genreSchema>;
