"use client";

import useEmblaCarousel from "embla-carousel-react";
import MangaCard from "@/components/cards/manga";
import { IManga } from "@/types/manga";

export default function MangaSlider({
  infiniteLoop = false,
  mangaData,
  autoSize = false,
}: {
  infiniteLoop?: boolean;
  mangaData: IManga[];
  autoSize?: boolean;
}) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: infiniteLoop,
    dragFree: true,
    skipSnaps: true,
  });

  if (autoSize) {
    return (
      <div className="w-full bg-background">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {mangaData.map((manga) => (
              <div
                key={manga.id}
                className="flex-[0_0_calc(100%/3)] min-w-[calc(100%/3)] pr-2 sm:flex-[0_0_calc(100%/4)] sm:min-w-[calc(100%/4)] sm:pr-4 md:flex-[0_0_calc(100%/6)] md:min-w-[calc(100%/6)] xl:flex-[0_0_calc(100%/7)] xl:min-w-[calc(100%/7)]"
              >
                <MangaCard manga={manga} auto={autoSize} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background py-5">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {mangaData.map((manga) => (
            <div
              key={manga.id}
              className="flex-[0_0_135px] min-w-[135px] pr-2 sm:flex-[0_0_160px] sm:min-w-[160px] sm:pr-4 lg:flex-[0_0_170px] lg:min-w-[170px]"
            >
              <MangaCard manga={manga} auto={autoSize} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
