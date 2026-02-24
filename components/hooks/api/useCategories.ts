import { cacheStaleTimesInMilliseconds } from "@/lib/constants";
import { CategorySchema } from "@/lib/validations/category.validation";
import categoryService from "@/services/category.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getCategories(),
    staleTime: cacheStaleTimesInMilliseconds.hour,
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data: CategorySchema) => categoryService.createCategory(data),
  });
};
