import BookmarkButton from "@/components/features/bookmark/BookmarkButton";
import { AlertIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { IManga } from "@/types/manga";
import Image from "next/image";

const AsideLayout = ({ manga }: { manga: IManga }) => {
  return (
    <aside className="w-full md:w-[241px] flex-none md:sticky top-24 z-10">
      <div className="flex flex-col gap-4">
        {/* Poster Image */}
        <div className="relative w-full aspect-241/360 rounded-xl overflow-hidden shadow-xl border border-border">
          <Image
            src={manga.images.cover.url}
            alt={manga.title}
            fill
            priority // LCP optimizatsiyasi uchun
            sizes="241px"
            className="object-cover"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Button className="h-12 text-md font-semibold">{"O'qish"}</Button>
          <BookmarkButton mangaId={manga._id} />
          <Button variant={"outline"}>
            Shikoyat qilish
            <AlertIcon />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AsideLayout;
