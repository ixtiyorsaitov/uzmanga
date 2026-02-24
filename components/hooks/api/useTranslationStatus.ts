import { cacheStaleTimesInMilliseconds } from "@/lib/constants";
import { TranslationStatusSchema } from "@/lib/validations/translation.status.validations";
import translationStatusService from "@/services/translation.status.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTranslationStatus = () => {
  return useQuery({
    queryKey: ["translation-status"],
    queryFn: () => translationStatusService.getTranslationStatus(),
    staleTime: cacheStaleTimesInMilliseconds.hour,
  });
};

export const useCreateTranslationStatus = () => {
  return useMutation({
    mutationFn: (data: TranslationStatusSchema) =>
      translationStatusService.createTranslationStatus(data),
  });
};
