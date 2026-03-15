"use client";

import { EyeIcon, HeartIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { IChapter } from "@/types/chapter";
import { useRouter } from "next/navigation";
import { formatDate } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import LockIcon from "@/components/icons/lock.icon";
import {
  useToggleReactionChapter,
  useToggleReadStatus,
} from "@/components/hooks/api/useChapters";
import { appToast } from "@/lib/app-toast";
import { useAuth } from "@/components/contexts/auth.context";
import useAuthModal from "@/components/hooks/modals/useAuthModal";

export default function ChapterCard({
  chapter,
  slug,
}: {
  chapter: IChapter;
  slug: string;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const { setOpen: openAuthModal } = useAuthModal();
  const [isLiked, setIsLiked] = useState(chapter.isLiked);
  const [isRead, setIsRead] = useState(chapter.isRead);
  const [likesCount, setLikesCount] = useState(chapter.stats.score);
  const toggleReaction = useToggleReactionChapter();
  const { mutate: toggleReadStatus, isPending: toggleReadStatusPending } =
    useToggleReadStatus();

  const handleReact = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (!user) {
      openAuthModal(true);
      return;
    }

    if (isLiked) return;

    toggleReaction.mutate(chapter._id, {
      onSuccess: (res) => {
        setIsLiked(res.data!.isLiked);
        setLikesCount(res.data!.score);
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || "Xatolik yuz berdi";
        appToast.error(message);
      },
    });
    setIsLiked((prev) => !prev);
  };

  const handleToggleReadStatus = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    toggleReadStatus(chapter._id, {
      onSuccess: (res) => {
        console.log(res);

        setIsRead(res.data!.isRead);
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || "Xatolik yuz berdi";
        appToast.error(message);
      },
    });
  };

  const handleCardClick = () => {
    router.push(`/mangas/${slug}/${chapter._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      key={chapter._id}
      className="cursor-pointer overflow-hidden p-4 blur-card mt-2 rounded-2xl border hover:border-primary flex items-center justify-between transition-colors"
    >
      {isRead && (
        <div className="w-full h-full bg-background/50 absolute top-0 left-0 z-10 pointer-events-none"></div>
      )}
      <div className="flex items-center justify-start gap-5">
        {user && (
          <Button
            className="size-5! hover:bg-secondary!"
            size={"icon"}
            variant={"ghost"}
            onClick={handleToggleReadStatus}
            disabled={toggleReadStatusPending}
          >
            <EyeIcon disable={isRead} />
          </Button>
        )}
        <div className="flex items-center justify-start gap-4">
          <p className="text-xl font-bold text-muted-foreground">
            {chapter.volumeNumber}
          </p>
          <div>
            <h2 className="text-sm">
              {chapter.title?.trim() !== ""
                ? chapter.title
                : `Bob ${chapter.chapterNumber}`}
            </h2>
            <p className="text-xs text-muted-foreground">
              {chapter.createdBy.name}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-xs text-muted-foreground">
          {formatDate(chapter.publishedAt, "dd.MM.yyyy")}
        </p>
        <div className="flex items-center justify-center gap-5">
          {chapter.isLocked && (
            <Button variant={"ghost"} size={"icon"} className="size-5!">
              <LockIcon />
            </Button>
          )}
          <div className="flex items-center gap-1">
            <Button
              onClick={handleReact}
              variant="ghost"
              className="hover:bg-accent"
            >
              <HeartIcon
                className={cn(
                  "size-5 mr-1.5",
                  isLiked && "fill-red-500 text-red-500",
                )}
              />{" "}
              <span className="text-sm font-medium">{likesCount}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
