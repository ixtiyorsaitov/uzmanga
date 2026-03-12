"use client";

import {
  useCheckReaction,
  useToggleReaction,
} from "@/components/hooks/api/useChapters";
import { HeartIcon } from "@/components/icons";
import CoinIcon from "@/components/icons/coin.icon";
import StarIcon from "@/components/icons/star.icon";
import { Button } from "@/components/ui/button";
import { appToast } from "@/lib/app-toast";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { memo, useState } from "react";

const ChapterBottomButtons = ({
  chapterId,
  isLiked: defaultIsLiked,
  likesCount: defaultLikesCount,
}: {
  chapterId: string;
  isLiked: boolean;
  likesCount: number;
}) => {
  const [isLiked, setIsLiked] = useState(defaultIsLiked);
  const [likesCount, setLikesCount] = useState(defaultLikesCount);

  const toggleReaction = useToggleReaction();

  const handleReact = () => {
    if (isLiked) return;
    toggleReaction.mutate(chapterId, {
      onSuccess: (res) => {
        console.log(res);

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
  return (
    <div className="w-full flex items-center justify-center gap-5">
      <Button variant={"secondary"} size={"lg"} className="text-md">
        <StarIcon className="size-6! text-yellow-500" />
        Baho berish
      </Button>
      <Button
        size={"lg"}
        className={cn("text-md")}
        disabled={toggleReaction.isPending}
        onClick={handleReact}
      >
        <HeartIcon
          className={cn("size-6!", isLiked && "fill-red-500 text-red-500")}
        />
        Raxmat ({likesCount})
      </Button>
      <Button variant={"secondary"} size={"lg"} className="text-md">
        <CoinIcon className="size-6!" />
        Qo'llab-quvvatlash
      </Button>
    </div>
  );
};

export default memo(ChapterBottomButtons);
