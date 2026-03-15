import { useAuth } from "@/components/contexts/auth.context";
import BookmarkButton from "@/components/features/bookmark/BookmarkButton";
import useAuthModal from "@/components/hooks/modals/useAuthModal";
import { AlertIcon, BellIcon, BookmarkIcon } from "@/components/icons";
import Wrapper from "@/components/layout/wrapper";
import AuthModal from "@/components/modals/auth";
import Logo from "@/components/shared/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useChapterStore } from "@/store/chapter.store";
import { IManga } from "@/types/manga";
import { ChevronLeftIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const UserDropdown = dynamic(
  () => import("@/components/shared/navbar/user.dropdown"),
  {
    ssr: false,
    loading: () => null,
  },
);

interface ChapterNavbarProps {
  manga: IManga;
}

export default function ChapterNavbar({ manga }: ChapterNavbarProps) {
  const { user } = useAuth();
  const { visiblePanels } = useChapterStore();
  const { setOpen: setAuthOpen } = useAuthModal();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b bg-background/80 backdrop-blur-md",
        visiblePanels
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0",
      )}
    >
      <Wrapper className="sm:px-4 px-1">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Logo />
            <Link
              href={`/mangas/${manga.slug}/main`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "hover:bg-accent! max-w-[300px] truncate",
              )}
            >
              <ChevronLeftIcon />
              <span className="truncate md:flex hidden ">{manga.title}</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <div className="md:flex hidden">
                  <BookmarkButton mangaId={manga._id} />
                  <Button size={"icon"} variant={"secondary"}>
                    <BookmarkIcon className="size-5" />
                  </Button>
                  <Button variant={"secondary"} size={"icon"}>
                    <BellIcon className="size-5" />
                  </Button>
                </div>
                <div className="md:hidden">
                  <Button
                    size={"icon"}
                    className="rounded-full"
                    variant={"secondary"}
                  >
                    <AlertIcon className="size-5" />
                  </Button>
                </div>
                <DropdownMenu
                  open={dropdownOpen}
                  onOpenChange={setDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Avatar className="size-9">
                      <AvatarImage />
                      <AvatarFallback>I</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  {dropdownOpen && <UserDropdown />}
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button size={"icon"} variant={"secondary"}>
                  <BookmarkIcon className="size-5" />
                </Button>
                <Button onClick={() => setAuthOpen(true)}>
                  {"Kirish/Ro'yxatdan o'tish"}
                </Button>
                <AuthModal />
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </nav>
  );
}
