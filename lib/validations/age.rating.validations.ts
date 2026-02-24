import { z } from "zod";

export const ageRatingSchema = z.object({
  name: z.string().min(1, "Yosh chegarasi nomi bo'lishi shart"),
});

export type AgeRatingSchema = z.infer<typeof ageRatingSchema>;
