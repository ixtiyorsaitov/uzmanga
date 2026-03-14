import { cacheStaleTimesInMilliseconds } from "@/lib/constants";
import chapterService from "@/services/chapter.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateChapter = () => {
  return useMutation({
    mutationFn: ({ mangaId, data }: { mangaId: string; data: FormData }) =>
      chapterService.createChapter(mangaId, data),
  });
};

export const useToggleReaction = () => {
  return useMutation({
    mutationFn: (chapterId: string) => chapterService.toggleReaction(chapterId),
  });
};

export const useCheckReaction = (chapterId: string) => {
  return useQuery({
    queryKey: ["check-reaction", chapterId],
    queryFn: () => chapterService.checkReaction(chapterId),
    staleTime: cacheStaleTimesInMilliseconds.minute * 5,
  });
};

export const useMarkChapterAsRead = () => {
  return useMutation({
    mutationFn: (chapterId: string) =>
      chapterService.markChapterAsRead(chapterId),
  });
};

export const useToggleReadStatus = () => {
  return useMutation({
    mutationFn: (chapterId: string) =>
      chapterService.toggleReadStatus(chapterId),
  });
};
