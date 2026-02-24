import { z } from "zod";

export const mangaSchema = z.object({
  title: z
    .string({ error: "Manga nomi kiritilishi shart" })
    .trim()
    .min(1, "Manga nomi bo'lishi shart"),

  description: z
    .string({ error: "Manga tavsifi kiritilishi shart" })
    .superRefine((val, ctx) => {
      const plainText = val.replace(/<[^>]*>?/gm, "").trim();

      if (plainText.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Manga tavsifi kamida 10 ta harfdan iborat bo'lishi shart",
        });
      }
    }),

  banner: z
    .any()
    .refine((file) => file !== null, "Manga banner rasmi yuklanishi shart"),

  type: z
    .string({ error: "Manga turini tanlang" })
    .min(1, "Manga turini tanlang"),

  ageRating: z
    .string({ error: "Yosh chegarasini tanlang" })
    .min(1, "Yosh chegarasini tanlang"),

  releaseYear: z
    .string({ error: "Yili kiritilishi shart" })
    .min(1, "Yili kiritilishi shart")
    .regex(/^[0-9]{4}$/, "Yil 4 xonali son bo'lishi kerak"),

  translationStatus: z
    .string({ error: "Tarjima holatini tanlang" })
    .min(1, "Tarjima holatini tanlang"),

  status: z
    .string({ error: "Asar holatini tanlang" })
    .min(1, "Asar holatini tanlang"),

  categories: z
    .array(z.string(), { error: "Kategoriya kiritilishi shart" })
    .min(1, "Kamida bitta kategoriya tanlang"),

  genres: z
    .array(z.string(), { error: "Janr kiritilishi shart" })
    .min(1, "Kamida bitta janr tanlang"),

  tags: z
    .array(z.string(), { error: "Teglar kiritilishi shart" })
    .min(1, "Kamida bitta teg kiriting"),
  messageToModerator: z.string().trim().optional(),
});

export type MangaSchema = z.infer<typeof mangaSchema>;
