import MangaService from "@/services/manga.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetMangas = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["mangas", page, limit],
    queryFn: () => MangaService.getMangas(page, limit),
  });
};

export const useCreateManga = () => {
  return useMutation({
    mutationFn: (formData: FormData) => MangaService.createManga(formData),
  });
};
