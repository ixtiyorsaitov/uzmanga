import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ISlider } from "@/types/slider";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  sliderData: ISlider[];
  infiniteLoop?: boolean;
  auto?: boolean;
  nextPrevButtons?: boolean;
}

const HomeSlider = ({
  sliderData,
  auto,
  infiniteLoop,
  nextPrevButtons = true,
}: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: infiniteLoop,
    duration: 18
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="w-full relative mb-20">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {sliderData.map((slider) => (
            <div key={slider._id} className="flex-[0_0_100%] min-w-full px-2">
              <SliderCard slider={slider} />
            </div>
          ))}
        </div>
        {nextPrevButtons && (
          <>
            <Button
              variant={"ghost"}
              className="absolute top-1/2 -translate-y-1/2 -left-10 hover:bg-accent"
              size="icon"
              onClick={scrollPrev}
            >
              <ChevronLeft className="size-6!" />
            </Button>
            <Button
              variant={"ghost"}
              className="absolute top-1/2 -translate-y-1/2 -right-10 hover:bg-accent"
              size="icon"
              onClick={scrollNext}
            >
              <ChevronRight className="size-6!" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeSlider;

const SliderCard = ({ slider }: { slider: ISlider }) => {
  return (
    <div className="w-full">
      {/* Card Image */}
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden shadow-sm w-full h-[290px] bg-card flex gap-2 p-2",
        )}
        style={{ background: slider.image }}
      ></div>
    </div>
  );
};
