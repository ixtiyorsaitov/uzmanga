import { cacheStaleTimesInMilliseconds } from "@/lib/constants";
import { AgeRatingSchema } from "@/lib/validations/age.rating.validations";
import ageRatingService from "@/services/age.rating.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAgeRatings = () => {
  return useQuery({
    queryKey: ["age-ratings"],
    queryFn: () => ageRatingService.getAgeRatings(),
    staleTime: cacheStaleTimesInMilliseconds.hour,
  });
};

export const useCreateAgeRating = () => {
  return useMutation({
    mutationFn: (data: AgeRatingSchema) =>
      ageRatingService.createAgeRating(data),
  });
};
