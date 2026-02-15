"use client";

import useEmblaCarousel from "embla-carousel-react";
import MangaCard, { MangaCardSkeleton } from "@/components/cards/manga";
import { IManga } from "@/types/manga";
import { cn } from "@/lib/utils";

export default function MangaSlider({
  infiniteLoop = false,
  mangaData,
  autoSize = false,
  loading = false,
  skeletonCount = 10,
}: {
  infiniteLoop?: boolean;
  mangaData: IManga[];
  autoSize?: boolean;
  loading?: boolean;
  skeletonCount?: number;
}) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: infiniteLoop,
    dragFree: true,
    skipSnaps: true,
  });

  if (loading) {
    return (
      <MangaSliderSkeleton autoSize={autoSize} itemCount={skeletonCount} />
    );
  }

  if (autoSize) {
    return (
      <div className="w-full bg-background">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {mangaData.map((manga) => (
              <div
                key={manga._id}
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
              key={manga._id}
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

interface SliderSkeletonProps {
  autoSize?: boolean;
  itemCount: number;
}

export function MangaSliderSkeleton({
  autoSize = false,
  itemCount,
}: SliderSkeletonProps) {
  const skeletons = Array.from({ length: itemCount });

  return (
    <div className={cn("w-full bg-background", !autoSize && "py-5")}>
      <div className="overflow-hidden">
        <div className="flex">
          {skeletons.map((_, index) => (
            <div
              key={index}
              className={cn(
                // Asosiy sliderdagi kenglik klasslarini aynan ko'chirib o'tamiz
                autoSize
                  ? "flex-[0_0_calc(100%/3)] min-w-[calc(100%/3)] pr-2 sm:flex-[0_0_calc(100%/4)] sm:min-w-[calc(100%/4)] sm:pr-4 md:flex-[0_0_calc(100%/6)] md:min-w-[calc(100%/6)] xl:flex-[0_0_calc(100%/7)] xl:min-w-[calc(100%/7)]"
                  : "flex-[0_0_135px] min-w-[135px] pr-2 sm:flex-[0_0_160px] sm:min-w-[160px] sm:pr-4 lg:flex-[0_0_170px] lg:min-w-[170px]",
              )}
            >
              <MangaCardSkeleton auto={autoSize} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
