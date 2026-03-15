"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { useChapterStore } from "@/store/chapter.store";

interface ChapterImageProps {
  url: string;
  index: number;
  onImageClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ChapterImage({
  url,
  index,
  onImageClick,
}: ChapterImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const { visiblePanels, setVisiblePanels } = useChapterStore();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onImageClick) {
      onImageClick(e);
    } else {
      setVisiblePanels(!visiblePanels);
    }
  };

  return (
    <div
      className="relative w-full bg-muted/10 overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="w-full h-full min-h-[500px] rounded-none animate-pulse" />
        </div>
      )}

      <Image
        src={url}
        alt={`Manga page ${index + 1}`}
        width={900}
        height={1300}
        layout="responsive"
        objectFit="contain"
        priority={index < 2}
        quality={75}
        onLoadingComplete={() => setIsLoading(false)}
        className={cn(
          "transition-all duration-700 ease-in-out",
          isLoading
            ? "scale-105 blur-lg opacity-0"
            : "scale-100 blur-0 opacity-100",
        )}
      />
    </div>
  );
}
