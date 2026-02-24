import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Kategoriya nomi bo'lishi shart"),
});

export type CategorySchema = z.infer<typeof categorySchema>;
