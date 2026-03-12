import MangaService from "@/services/manga.service";
import FilterChapters from "./filter-chapters";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EyeIcon, HeartIcon } from "@/components/icons";
import { IChapter } from "@/types/chapter";
import { formatDate } from "date-fns";
import LockIcon from "@/components/icons/lock.icon";
import ChapterService from "@/services/chapter.service";
import userService from "@/services/user.service"; // <-- UserService qo'shildi

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
            <Link
              href={`/mangas/${slug}/${chapter._id}`}
              key={chapter._id}
              className="p-4 blur-card mt-2 rounded-2xl border hover:border-primary flex items-center justify-between transition-colors"
            >
              <div className="flex items-center justify-start gap-5">
                <Button
                  className="size-5! hover:bg-secondary!"
                  size={"icon"}
                  variant={"ghost"}
                >
                  <EyeIcon />
                </Button>
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
                      variant="ghost"
                      className="h-5! px-1! hover:bg-transparent"
                    >
                      <HeartIcon className="size-4 mr-1.5" />{" "}
                      <span className="text-xs font-medium">144</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
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
