import { cacheStaleTimesInMilliseconds } from "@/lib/constants";
import { MangaStatusSchema } from "@/lib/validations/manga.status.validations";
import mangaStatusService from "@/services/manga.status.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useMangaStatus = () => {
  return useQuery({
    queryKey: ["manga-status"],
    queryFn: () => mangaStatusService.getMangaStatus(),
    staleTime: cacheStaleTimesInMilliseconds.hour,
  });
};

export const useCreateMangaStatus = () => {
  return useMutation({
    mutationFn: (data: MangaStatusSchema) =>
      mangaStatusService.createMangaStatus(data),
  });
};
