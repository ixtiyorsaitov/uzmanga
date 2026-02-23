"use client";

import { useState, useEffect } from "react";
import { IMedia } from "@/types";
import { IManga } from "@/types/manga";
import ChapterImage from "./ChapterImage";
import ChapterNavbar from "./ChapterNavbar";
import SmartSidePanel from "./SmartSidePanel";

interface ChapterViewerProps {
  images: IMedia[];
  manga: IManga;
}

export const ChapterViewer = ({ images, manga }: ChapterViewerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen bg-background">
      <ChapterNavbar isVisible={isVisible} manga={manga} />

      <SmartSidePanel isVisible={isVisible} />

      <main className="w-full max-w-[900px] mx-auto pt-4 flex flex-col items-center">
        {images.map((img, index) => (
          <ChapterImage key={img._id || index} url={img.url} index={index} />
        ))}
      </main>

      <div className="py-20 text-muted-foreground text-sm">Bob tugadi</div>
    </div>
  );
};
