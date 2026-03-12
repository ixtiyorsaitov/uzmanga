import { useMutation, useQuery } from "@tanstack/react-query";
import BookmarkService from "@/services/bookmark.service";
import { cacheStaleTimesInMilliseconds } from "@/lib/constants";

export const useToggleBookmark = () => {
  return useMutation({
    mutationFn: BookmarkService.toggleBookmark,
  });
};

export const useCheckIsBookmarked = ({
  mangaId,
  enabled,
}: {
  mangaId: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["bookmark", mangaId],
    queryFn: () => BookmarkService.checkIsBookmarked({ mangaId }),
    staleTime: cacheStaleTimesInMilliseconds.minute,
    enabled,
  });
};

export const useDeleteBookmark = () => {
  return useMutation({
    mutationFn: BookmarkService.deleteBookmark,
  });
};
