import { z } from "zod";

export const mangaSchema = z.object({
  title: z
    .string({ error: "Manga nomi kiritilishi shart" })
    .trim() // Bo'sh probellarni olib tashlaydi ("   " o'tib ketmasligi uchun)
    .min(1, "Manga nomi bo'lishi shart"),

  description: z
    .string({ error: "Manga tavsifi kiritilishi shart" })
    .superRefine((val, ctx) => {
      // HTML teglarni olib tashlab, faqat toza matnni o'lchaymiz
      const plainText = val.replace(/<[^>]*>?/gm, "").trim();

      if (plainText.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Manga tavsifi kamida 10 ta harfdan iborat bo'lishi shart",
        });
      }
    }),

  tags: z
    .array(z.string(), { error: "Teglar kiritilishi shart" })
    .min(1, "Kamida bitta teg kiriting"),
});

export type MangaSchema = z.infer<typeof mangaSchema>;
