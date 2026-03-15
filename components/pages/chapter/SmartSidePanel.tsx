"use client";

import { useAuth } from "@/components/contexts/auth.context";
import BookmarkButton from "@/components/features/bookmark/BookmarkButton";
import { useToggleReactionChapter } from "@/components/hooks/api/useChapters";
import useAuthModal from "@/components/hooks/modals/useAuthModal";
import {
  ListIcon,
  CommentsIcon,
  HeartIcon,
  AddPictureIcon,
  EditIcon,
  SettingsIcon,
  PlayIcon,
  AlertIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appToast } from "@/lib/app-toast";
import { cn } from "@/lib/utils";
import { useChapterStore } from "@/store/chapter.store";
import { IChapter } from "@/types/chapter";
import { MoreVertical } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SmartSidePanelProps {
  chapter: IChapter;
  chapterId: string;
  pagesLength: number;
}

export default function SmartSidePanel({
  chapter,
  chapterId,
  pagesLength,
}: SmartSidePanelProps) {
  const {
    setChaptersSheetOpen,
    setCommentsSheetOpen,
    visiblePanels,
    setSettingsSheetOpen, // Hozircha sizda yo'q bo'lsa store'ga qo'shish kerak
    currentPage,
  } = useChapterStore();

  useEffect(() => {
    setChaptersSheetOpen(false);
  }, [chapterId]);

  return (
    <aside
      className={cn(
        "fixed z-40 transition-all duration-500 ease-in-out",
        // Mobil (< md): Pastda va o'rtada joylashadi
        "bottom-4 left-0 w-full flex justify-center flex-col items-center px-4",
        // Desktop (>= md): O'ng tomonda o'rtada joylashadi
        "md:bottom-auto md:left-auto md:right-6 md:top-1/2 md:w-auto md:-translate-y-1/2",
        // Ochiq/Yopiq holatdagi animatsiyalar
        visiblePanels
          ? "opacity-100 translate-y-0 md:translate-x-0"
          : "opacity-0 translate-y-24 md:translate-y-0 md:translate-x-20",
      )}
    >
      <CurrentPage
        className="md:hidden bg-background/40 mb-2"
        currentPage={currentPage}
        pagesLength={pagesLength}
      />
      <div
        className={cn(
          "rounded-full flex items-center gap-2 justify-center",
          // Mobil: Gorizontal va skroll qilinadigan
          "flex-row-reverse w-full overflow-x-auto [&::-webkit-scrollbar]:hidden p-2 shadow-lg",
          // Desktop: Vertikal
          "md:flex-col  md:overflow-visible md:bg-transparent md:shadow-none md:p-0",
        )}
      >
        {/* Sahifa raqami */}
        <CurrentPage
          className="md:flex hidden"
          currentPage={currentPage}
          pagesLength={pagesLength}
        />

        <div className="md:hidden">
          <BookmarkButton
            mangaId={chapter.manga._id}
            variant="icon"
            className="rounded-full size-12!"
            iconClassName="size-5"
          />
        </div>

        {/* 1-Guruh tugmalar */}
        <MainActionButtons
          defaultLiked={chapter.isLiked}
          chapterId={chapterId}
          likesCount={chapter.stats.score}
          commentsCount={chapter.stats.comments}
        />

        {/* 2-Guruh tugmalar */}
        <AccessibilityActionButtons />

        {/* 3-Guruh tugmalar */}
        <div className="md:flex hidden p-0! bg-secondary rounded-full items-center justify-between flex-row md:flex-col shrink-0">
          <Button
            size={"icon"}
            className="rounded-full w-12! h-12!"
            variant={"ghost"}
          >
            <PlayIcon className="size-5" />
          </Button>
          <Button
            size={"icon"}
            className="rounded-full w-12! h-12!"
            variant={"ghost"}
          >
            <AlertIcon className="size-5" />
          </Button>
        </div>
        <Button
          size={"icon"}
          className="rounded-full w-12! h-12! md:hidden bg-secondary"
          variant={"ghost"}
        >
          <PlayIcon className="size-5" />
        </Button>
      </div>
    </aside>
  );
}

const CurrentPage = ({
  className,
  currentPage,
  pagesLength,
}: {
  className?: string;
  currentPage: number;
  pagesLength: number;
}) => {
  return (
    <div
      className={cn(
        "text-xs md:hidden rounded-full bg-secondary md:bg-background px-3 py-1 shrink-0 font-medium",
        className,
      )}
    >
      {currentPage + 1}/{pagesLength}
    </div>
  );
};

const MainActionButtons = ({
  defaultLiked,
  chapterId,
  className,
}: {
  defaultLiked: boolean;
  chapterId: string;
  className?: string;
  likesCount: number;
  commentsCount: number;
}) => {
  const toggleReaction = useToggleReactionChapter();
  const { user } = useAuth();
  const { setOpen: openAuthModal } = useAuthModal();
  const [isLiked, setIsLiked] = useState(defaultLiked);

  const { setChaptersSheetOpen, setCommentsSheetOpen } = useChapterStore();

  const handleReact = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (!user) {
      openAuthModal(true);
      return;
    }

    if (isLiked) return;

    toggleReaction.mutate(chapterId, {
      onSuccess: (res) => {
        setIsLiked(res.data!.isLiked);
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || "Xatolik yuz berdi";
        appToast.error(message);
      },
    });
    setIsLiked((prev) => !prev);
  };
  return (
    <div
      className={cn(
        "p-0! flex bg-secondary rounded-full items-center justify-between flex-row md:flex-col shrink-0",
        className,
      )}
    >
      <Button
        size={"icon"}
        className="rounded-full w-12! h-12!"
        variant={"ghost"}
        onClick={() => setChaptersSheetOpen(true)}
      >
        <ListIcon className="size-5!" />
        122
      </Button>
      <Button
        size={"icon"}
        className="rounded-full w-12! h-12!"
        variant={"ghost"}
        onClick={() => setCommentsSheetOpen(true)}
      >
        <CommentsIcon className="size-5!" />
      </Button>
      <Button
        size={"icon"}
        className="rounded-full w-12! h-12!"
        variant={"ghost"}
        onClick={handleReact}
      >
        <HeartIcon
          className={cn("size-5", isLiked && "fill-red-500 text-red-500")}
        />
      </Button>
    </div>
  );
};

const AccessibilityActionButtons = () => {
  const { setSettingsSheetOpen } = useChapterStore();
  return (
    <>
      <div className="md:flex hidden p-0! bg-secondary rounded-full items-center justify-between flex-row md:flex-col shrink-0">
        <Button
          size={"icon"}
          className="rounded-full w-12! h-12!"
          variant={"ghost"}
        >
          <AddPictureIcon className="size-5!" />
        </Button>
        <Button
          size={"icon"}
          className="rounded-full w-12! h-12!"
          variant={"ghost"}
        >
          <EditIcon className="size-5!" />
        </Button>
        <Button
          size={"icon"}
          className="rounded-full w-12! h-12!"
          variant={"ghost"}
          onClick={() => setSettingsSheetOpen(true)}
        >
          <SettingsIcon className="size-5" />
        </Button>
      </div>

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size={"icon"}
              className="rounded-full w-12! h-12! bg-secondary"
              variant={"ghost"}
            >
              <MoreVertical className="size-5!" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Shorts yaratish</DropdownMenuItem>
            <DropdownMenuItem>Eslatmalar</DropdownMenuItem>
            <DropdownMenuItem>Sozlamalar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
