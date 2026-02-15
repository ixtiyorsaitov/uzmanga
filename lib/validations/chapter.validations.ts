import z from "zod";

export const searchChapterSchema = z.object({
  search: z.string().min(1, "Qidirishni kiriting"),
});

export type SearchChapterInput = z.infer<typeof searchChapterSchema>;
