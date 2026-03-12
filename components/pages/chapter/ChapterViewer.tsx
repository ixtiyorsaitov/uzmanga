"use client";

import { useState, useEffect, useRef } from "react";
import { IMedia } from "@/types";
import { IManga } from "@/types/manga";
import ChapterImage from "./ChapterImage";
import ChapterNavbar from "./ChapterNavbar";
import SmartSidePanel from "./SmartSidePanel";
import { IChapter, IChapterPage } from "@/types/chapter";
import CommentsSection from "@/components/features/comments";
import { CommentTargetType } from "@/types/comment";
import ChapterBottomButtons from "./ChapterBottomButtons";

interface ChapterViewerProps {
  chapter: IChapter;
  manga: IManga;
}

export const ChapterViewer = ({ chapter, manga }: ChapterViewerProps) => {
  const images = chapter.pages;

  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsVisible((prevIsVisible) => {
        if (currentScrollY > 0) {
          if (currentScrollY > lastScrollY.current) {
            return prevIsVisible ? false : prevIsVisible;
          } else {
            return !prevIsVisible ? true : prevIsVisible;
          }
        }
        return true;
      });

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen bg-background">
      {/* Bu ikkisi isVisible o'zgargandagina render bo'ladi */}
      <ChapterNavbar isVisible={isVisible} manga={manga} />
      <SmartSidePanel isVisible={isVisible} />

      <div className="max-w-[900px] w-full">
        <main className="w-full mx-auto pt-4 flex flex-col items-center">
          {images.map((img, index) => (
            <ChapterImage
              key={img.media._id || index}
              url={img.media.url}
              index={index}
            />
          ))}
        </main>

        <div className="w-full mt-20 space-y-20">
          <ChapterBottomButtons
            likesCount={chapter.stats.score}
            isLiked={chapter.isLiked}
            chapterId={chapter._id}
          />
          <CommentsSection
            targetId={chapter._id}
            targetType={CommentTargetType.CHAPTER}
            commentsCount={chapter.stats.comments}
          />
        </div>
      </div>
    </div>
  );
};
