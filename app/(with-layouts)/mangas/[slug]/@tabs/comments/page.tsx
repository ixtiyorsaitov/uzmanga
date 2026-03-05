import CommentsSection from "@/components/features/comments";
import mangaService from "@/services/manga.service";
import { CommentTargetType, IComment } from "@/types/comment";

export default async function Comments({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const mangaResponse = await mangaService.getManga(slug);
  if (!mangaResponse.success || !mangaResponse.data) return;
  const manga = mangaResponse.data;
  return (
    <CommentsSection
      targetId={manga._id}
      targetType={CommentTargetType.MANGA}
    />
  );
}
