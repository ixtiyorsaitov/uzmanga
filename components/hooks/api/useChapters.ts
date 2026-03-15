import { cacheStaleTimesInMilliseconds } from "@/lib/constants";
import chapterService from "@/services/chapter.service";
import { ChapterQueryParams } from "@/types/chapter";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetChaptersByMangaId = (
  mangaId: string,
  params: ChapterQueryParams,
) => {
  return useQuery({
    queryKey: [
      "chapters",
      mangaId,
      params.search,
      params.ordering,
      params.page,
      params.limit,
    ],
    queryFn: () => chapterService.getChaptersByMangaId(mangaId, params),
    staleTime: cacheStaleTimesInMilliseconds.minute * 10,
  });
};

export const useCreateChapter = () => {
  return useMutation({
    mutationFn: ({ mangaId, data }: { mangaId: string; data: FormData }) =>
      chapterService.createChapter(mangaId, data),
  });
};

export const useToggleReactionChapter = () => {
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
