import z from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Bo'sh")
    .max(1000, "Izoh 1000 ta belgidan kamroq bo'lishi kerak"),
});

export type CommentSchema = z.infer<typeof commentSchema>;
