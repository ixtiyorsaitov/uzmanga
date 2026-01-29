"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const animeData = [
  {
    id: 1,
    title: "Апокалипсис наступил",
    year: "Манхва 2025",
    rating: "8.2",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "Цветение вишни",
    year: "Манхва 2020",
    rating: "8.7",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    title: "Поле боя Фридриха: Батровый гений",
    year: "Манга 2025",
    rating: "7.5",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: 4,
    title: "Я переродился монстром в игрово",
    year: "Манга 2025",
    rating: "8.9",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: 5,
    title: "Первобытный охотник",
    year: "Западный комикс 2023",
    rating: "8.3",
    image: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  },
  {
    id: 6,
    title: "Судьба сестры-эльфийки",
    year: "Манхва 2023",
    rating: "8.8",
    image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  {
    id: 7,
    title: "Леди Скарлетт",
    year: "Манхва 2021",
    rating: "7.4",
    image: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
  },
  {
    id: 8,
    title: "Возвращение героя катастрофы",
    year: "Манхва 2021",
    rating: "8.8",
    image: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
  {
    id: 9,
    title: "Интернет убийца",
    year: "Манхва 2022",
    rating: "8.5",
    image: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
  },
  {
    id: 10,
    title: "Темный маг наступающий",
    year: "Манхва 2023",
    rating: "8.1",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 11,
    title: "Магический академия",
    year: "Манга 2024",
    rating: "8.4",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 12,
    title: "Легенда королей",
    year: "Манхва 2025",
    rating: "8.6",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: 13,
    title: "Секрет звезды",
    year: "Манга 2023",
    rating: "7.8",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: 14,
    title: "Путь бесконечности",
    year: "Манхва 2024",
    rating: "8.7",
    image: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  },
  {
    id: 15,
    title: "Золотой символ",
    year: "Манга 2023",
    rating: "8.2",
    image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  {
    id: 16,
    title: "Охота на демона",
    year: "Манхва 2022",
    rating: "8.9",
    image: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
  },
  {
    id: 17,
    title: "Система выживания",
    year: "Манга 2024",
    rating: "8.3",
    image: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
  {
    id: 18,
    title: "Война богов",
    year: "Манхва 2023",
    rating: "8.8",
    image: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
  },
  {
    id: 19,
    title: "Ледяное сердце",
    year: "Манга 2025",
    rating: "8.4",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 20,
    title: "Заключительное королевство",
    year: "Манхва 2024",
    rating: "8.7",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
];

export default function MainSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      skipSnaps: false,
      dragFree: true,
      startIndex: 0,
    },
    [AutoScroll({ playOnInit: false })],
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full bg-background py-8">
      <div className="mx-auto overflow-hidden">
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden -mx-2" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {animeData.map((anime) => (
                <div
                  key={anime.id}
                  className="flex-none w-72 shrink-0 px-2"
                >
                  <div className="group relative">
                    {/* Card Image */}
                    <div
                      className="relative w-full aspect-3/4 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                      style={{
                        background: anime.image,
                      }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 bg-yellow-400/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-black">
                          {anime.rating}
                        </span>
                      </div>
                    </div>

                    {/* Card Info */}
                    <div className="mt-4 space-y-2">
                      <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {anime.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {anime.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
