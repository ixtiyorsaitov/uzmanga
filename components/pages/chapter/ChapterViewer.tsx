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
import { useMarkChapterAsRead } from "@/components/hooks/api/useChapters";
import { appToast } from "@/lib/app-toast";
import ChaptersSheet from "./ChaptersSheet";
import CommentsSheet from "./CommentsSheet";
import { useChapterStore } from "@/store/chapter.store";
import SettingsSheet from "./SettingsSheet";

interface ChapterViewerProps {
  params: {
    slug: string;
    search: string;
    ordering: "index" | "-index";
  };
  chapter: IChapter;
  manga: IManga;
  chapterId: string;
}

export const ChapterViewer = ({
  params,
  chapter,
  manga,
  chapterId,
}: ChapterViewerProps) => {
  const images = chapter.pages;
  const hasFetched = useRef(false);

  const {
    setVisiblePanels,
    containerWidth,
    brightness,
    imageGap,
    readingMode,
    visiblePanels,
    currentPage,
    setCurrentPage,
  } = useChapterStore();
  const { mutate: markAsRead } = useMarkChapterAsRead();

  useEffect(() => {
    if (hasFetched.current) return;
    markAsRead(chapter._id, {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || "Xatolik yuz berdi";
        appToast.error(message);
      },
    });
    hasFetched.current = true;
  }, [chapter._id, markAsRead]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisiblePanels(false);
      } else if (currentScrollY < lastScrollY) {
        setVisiblePanels(true);
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [setVisiblePanels]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
          // Vertikal rejimda bo'lsa, o'sha rasmga avtomatik scroll qilish
          if (readingMode === "vertical") {
            document
              .getElementById(`page-${currentPage - 1}`)
              ?.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else if (e.key === "ArrowRight") {
        if (currentPage < images.length - 1) {
          setCurrentPage(currentPage + 1);
          if (readingMode === "vertical") {
            document
              .getElementById(`page-${currentPage + 1}`)
              ?.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, images.length, readingMode, setCurrentPage]);

  useEffect(() => {
    if (readingMode !== "vertical") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setCurrentPage(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    );
    const imageElements = document.querySelectorAll(".chapter-image-container");
    imageElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [readingMode, images.length, setCurrentPage]);

  const handleHorizontalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (readingMode === "vertical") {
      setVisiblePanels(!visiblePanels);
      return;
    }

    const { clientX } = e;
    const { innerWidth } = window;

    if (clientX < innerWidth / 3) {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (clientX > (innerWidth / 3) * 2) {
      if (currentPage < images.length - 1) {
        setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setVisiblePanels(!visiblePanels);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen bg-background">
      <ChapterNavbar manga={manga} />
      <SmartSidePanel
        pagesLength={images.length}
        chapterId={chapterId}
        chapter={chapter}
      />

      <div
        style={{
          maxWidth: `${containerWidth}%`,
          filter: `brightness(${brightness}%)`,
        }}
        className="w-full mx-auto"
      >
        <main
          className="w-full mx-auto pt-4 flex flex-col items-center"
          style={{ gap: readingMode === "vertical" ? `${imageGap}px` : "0px" }}
        >
          {readingMode === "vertical"
            ? images.map((img, index) => (
                <div
                  key={img.media._id || index}
                  id={`page-${index}`}
                  data-index={index}
                  className="chapter-image-container w-full"
                >
                  <ChapterImage
                    url={img.media.url}
                    index={index}
                    onImageClick={handleHorizontalClick}
                  />
                </div>
              ))
            : images.length > 0 && (
                <ChapterImage
                  key={images[currentPage].media._id || currentPage}
                  url={images[currentPage].media.url}
                  index={currentPage}
                  onImageClick={handleHorizontalClick}
                />
              )}
        </main>
      </div>

      {readingMode === "horizontal" && (
        <div className="flex mt-5 items-center justify-center">
          {currentPage + 1} / {images.length}
        </div>
      )}

      <div className="w-full max-w-[900px] mx-auto mt-20 space-y-20">
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

      <CommentsSheet
        chapterId={chapter._id}
        commentsCount={chapter.stats.comments}
      />
      <ChaptersSheet mangaId={manga._id} params={params} />
      <SettingsSheet />
    </div>
  );
};
