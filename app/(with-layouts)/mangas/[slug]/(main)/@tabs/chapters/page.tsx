import MangaService from "@/services/manga.service";
import FilterChapters from "./filter-chapters";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IChapter } from "@/types/chapter";
import ChapterService from "@/services/chapter.service";
import userService from "@/services/user.service";
import ChapterCard from "./ChapterCard";
import ChaptersClient from "@/components/pages/chapter/ChaptersClient";

const ChaptersPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ search?: string; ordering?: "index" | "-index" }>;
}) => {
  const { slug } = await params;
  const { search = "", ordering = "-index" } = await searchParams;

  const mangaResponse = await MangaService.getManga(slug);
  if (!mangaResponse.success || !mangaResponse.data) return;
  const manga = mangaResponse.data;

  let user = null;
  try {
    const { data } = await userService.getMe();
    user = data;
  } catch (err) {
    user = null;
  }

  const isPublisherOrTranslator = user && user._id === manga.createdBy?._id;

  return (
    <ChaptersClient
      ordering={ordering}
      search={search}
      isPublisherOrTranslator={isPublisherOrTranslator || false}
      mangaId={manga._id}
      slug={slug}
    />
  );
};

export default ChaptersPage;
