// components/chapter/chapter-viewer.tsx
"use client";

import { useState, useEffect } from "react";
import Wrapper from "@/components/layout/wrapper";
import { cn } from "@/lib/utils";
import { IMedia } from "@/types";
import dynamic from "next/dynamic";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { BellIcon, BookmarkIcon } from "@/components/icons";
import Logo from "@/components/shared/logo";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronsLeftIcon } from "lucide-react";
import { IManga } from "@/types/manga";
import Link from "next/link";

interface ChapterViewerProps {
  images: IMedia[];
  manga: IManga;
}

const UserDropdown = dynamic(
  () => import("@/components/shared/navbar/user.dropdown"),
  {
    ssr: false,
    loading: () => null,
  },
);

export const ChapterViewer = ({ images, manga }: ChapterViewerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Agar 100px dan ko'proq scroll bo'lsa mantiq ishlaydi
      if (currentScrollY > 0) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false); // Pastga -> Yo'qoladi
        } else {
          setIsVisible(true); // Tepaga -> Chiqadi
        }
      } else {
        setIsVisible(true); // Eng tepada har doim ko'rinadi
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen bg-background">
      {/* 1. Smart Navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b bg-background/80 backdrop-blur-md",
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0",
        )}
      >
        <Wrapper>
          <div className="flex items-center justify-between py-3 px-4">
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
                <span className="truncate">{manga.title}</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button>Xatcho'pga</Button>
              <Button size={"icon"} variant={"secondary"}>
                <BookmarkIcon className="size-5" />
              </Button>
              <Button variant={"secondary"} size={"icon"}>
                <BellIcon className="size-5" />
              </Button>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Avatar className="size-9">
                    <AvatarImage />
                    <AvatarFallback>I</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                {dropdownOpen && <UserDropdown />}
              </DropdownMenu>
            </div>
          </div>
        </Wrapper>
      </nav>

      {/* 2. Smart Side Panel */}
      <aside
        className={cn(
          "fixed right-6 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ease-in-out hidden lg:block",
          isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0",
        )}
      >
        <div className="w-12 h-64 blur-card border rounded-full flex flex-col items-center justify-center gap-6 shadow-xl bg-secondary/20">
          {/* Kelajakdagi tugmalar uchun joy */}
          <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse" />
        </div>
      </aside>

      {/* 3. Manga Content */}
      <main className="w-full max-w-[900px] mx-auto pt-4 flex flex-col items-center">
        {images.map((img, index) => (
          <img
            key={img._id}
            src={img.url}
            alt={`Page ${index + 1}`}
            className="w-full h-auto block"
            // Senior-tip: Rasmlar orasida bo'shliq bo'lmasligi uchun block va h-auto
            loading={index < 3 ? "eager" : "lazy"}
          />
        ))}
      </main>

      {/* Footer mantiqi (Ixtiyoriy) */}
      <div className="py-20 text-muted-foreground text-sm">Bob tugadi</div>
    </div>
  );
};
