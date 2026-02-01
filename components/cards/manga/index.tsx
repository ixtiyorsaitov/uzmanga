"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { IManga } from "@/types/manga";

interface AnimeCardProps {
  manga: IManga;
  auto?: boolean;
}

export default function MangaCard({ manga, auto = false }: AnimeCardProps) {
  return (
    <div className="w-full">
      {/* Card Image */}
      <div
        className={cn(
          "relative rounded-lg overflow-hidden shadow-sm",
          auto
            ? "w-full aspect-162/243" // auto mode: responsive
            : "w-[127px] h-[190px] sm:w-[144px] sm:h-[216px] lg:w-[154px] lg:h-[231px]", // fixed mode: breakpoints
        )}
        style={{
          background: manga.image,
        }}
      >
        {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" /> */}

        {/* Rating */}
        <div className="absolute top-2 right-2 bg-yellow-400 px-1.5 py-0.5 rounded flex items-center gap-1">
          <Star className="w-3 h-3 fill-black text-black" />
          <span className="text-[10px] font-bold text-black">
            {manga.rating}
          </span>
        </div>
      </div>

      {/* Card Info */}
      <div className="mt-2">
        <p className="text-xs text-muted-foreground mt-1">{manga.year}</p>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
          {manga.title}
        </h3>
      </div>
    </div>
  );
}
