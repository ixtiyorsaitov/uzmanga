import { cacheStaleTimesInMilliseconds } from "@/lib/constants";
import { MangaTypeSchema } from "@/lib/validations/manga.type.validations";
import mangaTypeService from "@/services/manga.type.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useMangaTypes = () => {
  return useQuery({
    queryKey: ["manga-types"],
    queryFn: () => mangaTypeService.getMangaTypes(),
    staleTime: cacheStaleTimesInMilliseconds.hour,
  });
};

export const useCreateMangaType = () => {
  return useMutation({
    mutationFn: (data: MangaTypeSchema) =>
      mangaTypeService.createMangaType(data),
  });
};
