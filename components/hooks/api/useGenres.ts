import { cacheStaleTimesInMilliseconds } from "@/lib/constants";
import { GenreSchema } from "@/lib/validations/genre.validation";
import genreService from "@/services/genre.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => genreService.getGenres(),
    staleTime: cacheStaleTimesInMilliseconds.hour,
  });
};

export const useCreateGenre = () => {
  return useMutation({
    mutationFn: (data: GenreSchema) => genreService.createGenre(data),
  });
};
