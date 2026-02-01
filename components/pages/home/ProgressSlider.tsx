"use client";

import useEmblaCarousel from "embla-carousel-react";
import { IProgress } from "@/types/progress";
import ProgressCard from "@/components/cards/manga/ProgressCard";

export default function ProgressSlider({
  infiniteLoop = false,
  progressData,
}: {
  infiniteLoop?: boolean;
  progressData: IProgress[];
}) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: infiniteLoop,
    dragFree: true,
    skipSnaps: true,
  });

  return (
    <div className="w-full bg-background py-5">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {progressData.map((progress) => (
            <div
              key={progress.id}
              className="flex-[0_0_calc(100%/3)] min-w-[calc(100%/3)] pr-2 sm:pr-4 lg:flex-[0_0_calc(100%/4)] lg:min-w-[calc(100%/4)]"
            >
              <ProgressCard progress={progress} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
