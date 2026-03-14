import MangaService from "@/services/manga.service";
import FilterChapters from "./filter-chapters";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IChapter } from "@/types/chapter";
import ChapterService from "@/services/chapter.service";
import userService from "@/services/user.service";
import ChapterCard from "./ChapterCard";

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

  const chaptersResponse = await ChapterService.getChaptersByMangaId(
    manga._id,
    { search, ordering },
  );
  if (!chaptersResponse.success || !chaptersResponse.data) return;
  const chapters = chaptersResponse.data.chapters;

  let user = null;
  try {
    const { data } = await userService.getMe();
    user = data;
  } catch (err) {
    user = null;
  }

  const isPublisherOrTranslator = user && user._id === manga.createdBy?._id;

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
        {chapters.length > 0 ? (
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

export default ChaptersPage;
