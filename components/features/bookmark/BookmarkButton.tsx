"use client";

import { useQueryClient } from "@tanstack/react-query"; // <-- QueryClient ni chaqiramiz
import {
  useCheckIsBookmarked,
  useDeleteBookmark,
  useToggleBookmark,
} from "@/components/hooks/api/useBookmarks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appToast } from "@/lib/app-toast";
import { bookmarkMenuItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BOOKMARK_STATUS } from "@/types/bookmark";

export default function BookmarkButton({ mangaId }: { mangaId: string }) {
  const queryClient = useQueryClient();

  const { data: isBookmarkedData, isLoading } = useCheckIsBookmarked({
    mangaId,
  });
  const isBookmarked = isBookmarkedData?.data;

  const { mutate: toggleWrite, isPending } = useToggleBookmark();
  const deleteMutation = useDeleteBookmark();

  const toggleBookmark = (value: BOOKMARK_STATUS) => {
    if (value === isBookmarked?.status) return;

    toggleWrite(
      { mangaId, status: value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["bookmark", mangaId] });
        },
        onError: (err) => {
          appToast.error(err.message);
        },
      },
    );
  };

  const currentLabel = bookmarkMenuItems.find(
    (item) => item.value === isBookmarked?.status,
  )?.label;

  const deleteBookmark = () => {
    deleteMutation.mutate(
      { mangaId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["bookmark", mangaId] });
        },
        onError: (err) => {
          appToast.error(err.message);
        },
      },
    );
  };

  const loading = isLoading || isPending || deleteMutation.isPending;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full" disabled={loading}>
          {isBookmarked ? currentLabel : "Xatcho'pga qo'shish"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) mt-px">
        {bookmarkMenuItems.map((item) => (
          <DropdownMenuItem
            onClick={() => toggleBookmark(item.value)}
            className={cn(
              "cursor-pointer",
              isBookmarked?.status === item.value &&
                "bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            )}
            key={item.value}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={deleteBookmark} variant="destructive">
          Xatcho'pdan olish
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
