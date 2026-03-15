import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useChapterStore } from "@/store/chapter.store";
import Comments from "@/components/features/comments";
import { CommentTargetType } from "@/types/comment";

const CommentsSheet = ({
  chapterId,
  commentsCount,
}: {
  chapterId: string;
  commentsCount: number;
}) => {
  const { commentsSheetOpen, setCommentsSheetOpen } = useChapterStore();
  return (
    <Sheet open={commentsSheetOpen} onOpenChange={setCommentsSheetOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Izohlar</SheetTitle>
        </SheetHeader>
        <div className="px-2">
          <Comments
            targetId={chapterId}
            targetType={CommentTargetType.CHAPTER}
            commentsCount={commentsCount}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentsSheet;
