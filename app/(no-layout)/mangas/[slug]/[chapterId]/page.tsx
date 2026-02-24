// app/chapters/[chapterId]/page.tsx
import { ChapterViewer } from "@/components/pages/chapter/ChapterViewer";
import ChapterService from "@/services/chapter.service";
import { redirect } from "next/navigation";

const ChapterPage = async ({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) => {
  const { chapterId } = await params;
  const chapterResponse = await ChapterService.getChapter(chapterId);
  console.log(chapterResponse);

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

  return <ChapterViewer images={chapter.pages} manga={chapter.manga} />;
};

export default ChapterPage;
