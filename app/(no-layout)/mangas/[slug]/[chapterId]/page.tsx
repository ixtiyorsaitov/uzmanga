// app/chapters/[chapterId]/page.tsx
import { ChapterViewer } from "@/components/pages/chapter/ChapterViewer";
import ChapterService from "@/services/chapter.service";
import { redirect } from "next/navigation";

const ChapterPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ chapterId: string; slug: string }>;
  searchParams: Promise<{ search?: string; ordering?: "index" | "-index" }>;
}) => {
  const { chapterId, slug } = await params;
  const { search = "", ordering = "-index" } = await searchParams;
  const chapterResponse = await ChapterService.getChapter(chapterId);

  if (!chapterResponse.success || !chapterResponse.data) {
    return redirect("/404");
  }

  const chapter = chapterResponse.data;

  if (chapter.isLocked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">🔏 Ushbu bob qulflangan</h1>
      </div>
    );
  }

  return (
    <ChapterViewer
      params={{ slug, search, ordering }}
      chapter={chapter}
      manga={chapter.manga}
      chapterId={chapterId}
    />
  );
};

export default ChapterPage;
