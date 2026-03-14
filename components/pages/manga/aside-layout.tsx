import BookmarkButton from "@/components/features/bookmark/BookmarkButton";
import { AlertIcon } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IManga } from "@/types/manga";
import Image from "next/image";
import Link from "next/link";
import userService from "@/services/user.service";

const AsideLayout = async ({ manga }: { manga: IManga }) => {
  console.log(manga);

  let user = null;
  try {
    const { data: res } = await userService.getMe();
    user = res;
  } catch (err) {
    user = null;
  }

  const isPublisher = user && user._id === manga.createdBy?._id;
  return (
    <aside className="w-[320px] md:w-[241px] flex-none md:sticky top-24 z-10">
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
          <Link
            href={
              manga.userProgress
                ? `/mangas/${manga.slug}/${manga.userProgress._id}`
                : `/mangas/${manga.slug}/chapters`
            }
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 text-md font-semibold flex items-center justify-center flex-col gap-0",
            )}
          >
            {manga.userProgress ? (
              <>
                <h1 className="inline-block text-md">Davom etish</h1>
                <p className="text-xs font-light">
                  Jild {manga.userProgress.volumeNumber}, Bob{" "}
                  {manga.userProgress.chapterNumber}
                </p>
              </>
            ) : (
              "O'qish"
            )}
          </Link>
          <BookmarkButton mangaId={manga._id} />
          {isPublisher && (
            <Link
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "hover:bg-accent",
              )}
              href={`/mangas/${manga.slug}/edit`}
            >
              Tahrirlash
            </Link>
          )}
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
