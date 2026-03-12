import chapterService from "@/services/chapter.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateChapter = () => {
  return useMutation({
    mutationFn: ({ mangaId, data }: { mangaId: string; data: FormData }) =>
      chapterService.createChapter(mangaId, data),
  });
};
