"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { IManga } from "@/types/manga";
import Image from "next/image";
import Link from "next/link";

interface AnimeCardProps {
  manga: IManga;
  auto?: boolean;
}

export default function MangaCard({ manga, auto = false }: AnimeCardProps) {
  return (
    <Link href={`/mangas/${manga.slug}`} className="group">
      <div className="w-full">
        <div
          className={cn(
            "relative rounded-lg overflow-hidden shadow-sm transition-transform duration-300",
            auto
              ? "w-full aspect-162/243"
              : "w-[127px] h-[190px] sm:w-[144px] sm:h-[216px] lg:w-[154px] lg:h-[231px]",
          )}
        >
          <Image
            src={manga.images.cover.url}
            alt={`${manga.title} cover`}
            fill
            sizes="(max-width: 640px) 127px, (max-width: 1024px) 144px, 154px"
            className="object-cover  duration-300 hover:scale-[1.05] transition"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />

          <div className="absolute bottom-1 right-1 bg-background/80 py-1.5 px-3 rounded-full flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 fill-foreground" />
            <span className="text-sm font-bold">{8.7}</span>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-[11px] text-muted-foreground font-medium tracking-wider">
            {manga.type} • {manga.releaseYear}
          </p>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {manga.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

interface MangaSkeletonProps {
  auto?: boolean;
}
export function MangaCardSkeleton({ auto = false }: MangaSkeletonProps) {
  return (
    <div className="w-full animate-pulse">
      {/* Rasm qismi uchun skelet */}
      <div
        className={cn(
          "bg-muted rounded-lg shadow-sm",
          auto
            ? "w-full aspect-162/243"
            : "w-[127px] h-[190px] sm:w-[144px] sm:h-[216px] lg:w-[154px] lg:h-[231px]",
        )}
      />

      {/* Ma'lumotlar qismi uchun skelet */}
      <div className="mt-2 space-y-2">
        {/* Yili uchun kichik chiziq */}
        <div className="h-3 bg-muted rounded w-1/4" />

        {/* Sarlavha uchun ikki qatorli chiziq */}
        <div className="space-y-1">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}
