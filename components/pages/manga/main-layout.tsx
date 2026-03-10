import {
  ArrowTopRightIcon,
  BookmarkIcon,
  EyeIcon,
  HeartIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IManga } from "@/types/manga";
import Link from "next/link";

const MainLayout = ({ manga }: { manga: IManga }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-start gap-2 text-sm text-muted-foreground">
          <Link
            className="hoverLink flex items-center gap-px"
            href={`/mangas?types=${manga.type}`}
          >
            {manga.type.name}
            <ArrowTopRightIcon className="w-3 h-3" />
          </Link>
          <span>•</span>
          <Link
            className="hoverLink flex items-center gap-px"
            href={`/mangas?releaseYear=${manga.releaseYear}`}
          >
            {manga.releaseYear}
            <ArrowTopRightIcon className="w-3 h-3" />
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">{manga.title}</h1>
        <div className="space-x-2">
          <Button className="bg-transparent h-7! text-foreground! font-light dark:font-normal">
            <HeartIcon />
            Layklar: 398K
          </Button>
          <Button className="bg-transparent h-7! text-foreground! font-light dark:font-normal">
            <EyeIcon />
            Ko'rishlar: {manga.stats.views}
          </Button>
          <Button className="bg-transparent h-7! text-foreground! font-light dark:font-normal">
            <BookmarkIcon />
            Xatcho'plar: {manga.stats.bookmarks}
          </Button>
        </div>
      </div>
      <div className="flex items-end justify-center flex-col gap-y-2">
        <h1 className="text-green-500 text-2xl font-bold">8.7</h1>
        <p className="text-xs text-muted-foreground">2238 ovozlar</p>
        <Badge
          variant={"secondary"}
          className="text-xs! h-5! cursor-pointer px-1.5! bg-background!"
        >
          Baho berish
        </Badge>
      </div>
    </div>
  );
};

export default MainLayout;
