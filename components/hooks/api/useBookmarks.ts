import { useMutation, useQuery } from "@tanstack/react-query";
import BookmarkService from "@/services/bookmark.service";
import { cacheStaleTimesInMilliseconds } from "@/lib/constants";

export const useToggleBookmark = () => {
  return useMutation({
    mutationFn: BookmarkService.toggleBookmark,
  });
};

export const useCheckIsBookmarked = ({ mangaId }: { mangaId: string }) => {
  return useQuery({
    queryKey: ["bookmark", mangaId],
    queryFn: () => BookmarkService.checkIsBookmarked({ mangaId }),
    staleTime: cacheStaleTimesInMilliseconds.minute,
  });
};

export const useDeleteBookmark = () => {
  return useMutation({
    mutationFn: BookmarkService.deleteBookmark,
  });
};
