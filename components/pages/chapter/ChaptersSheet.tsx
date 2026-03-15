import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useChapterStore } from "@/store/chapter.store";
import React from "react";
import ChaptersClient from "./ChaptersClient";

const ChaptersSheet = ({
  params,
  mangaId,
}: {
  params: {
    slug: string;
    search: string;
    ordering: "index" | "-index";
  };
  mangaId: string;
}) => {
  const { chaptersSheetOpen, setChaptersSheetOpen } = useChapterStore();
  const { slug, search, ordering } = params;
  return (
    <Sheet open={chaptersSheetOpen} onOpenChange={setChaptersSheetOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Boblar</SheetTitle>
        </SheetHeader>
        <div className="px-2">
          <ChaptersClient
            ordering={ordering}
            search={search}
            isPublisherOrTranslator={false}
            mangaId={mangaId}
            slug={slug}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChaptersSheet;
