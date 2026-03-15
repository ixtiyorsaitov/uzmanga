"use client";

import ChapterCard from "@/app/(with-layouts)/mangas/[slug]/(main)/@tabs/chapters/ChapterCard";
import FilterChapters from "@/app/(with-layouts)/mangas/[slug]/(main)/@tabs/chapters/filter-chapters";
import { useGetChaptersByMangaId } from "@/components/hooks/api/useChapters";
import { Button } from "@/components/ui/button";
import { IChapter } from "@/types/chapter";
import Link from "next/link";
import React from "react";
import ChapterCardSkeleton from "./ChapterCardSkeleton";

const ChaptersClient = ({
  ordering,
  search,
  isPublisherOrTranslator,
  mangaId,
  slug,
}: {
  ordering: "index" | "-index";
  search: string;
  isPublisherOrTranslator: boolean;
  mangaId: string;
  slug: string;
}) => {
  const { data: chaptersRes, isLoading } = useGetChaptersByMangaId(mangaId, {
    search,
    ordering,
  });
  const chapters = chaptersRes?.data?.chapters || [];

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex-1">
          <FilterChapters ordering={ordering} search={search} />
        </div>

        {isPublisherOrTranslator && (
          <Link href={`/mangas/${slug}/add-chapter`}>
            <Button className="w-full sm:w-auto font-semibold">
              + Bob qo'shish
            </Button>
          </Link>
        )}
      </div>

      <div className="grid">
        {isLoading ? (
          [...Array(10)].map((_, i) => <ChapterCardSkeleton key={i} />)
        ) : chapters.length > 0 ? (
          chapters.map((chapter: IChapter) => (
            <ChapterCard key={chapter._id} chapter={chapter} slug={slug} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-30 space-y-2">
            <h1 className="text-5xl">🎴</h1>
            <p className="text-muted-foreground">Boblar topilmadi.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChaptersClient;
