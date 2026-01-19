"use client"; // Bu muhim!

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import SearchTrigger from "./search-trigger";
import { Skeleton } from "@/components/ui/skeleton";

const ThemeSwitcher = dynamic(() => import("@/components/ui/theme-switcher"), {
  ssr: false,
  loading: () => <Skeleton className="size-9 rounded-full" />,
});

export const NavbarRight = () => {
  return (
    <div className="flex items-center justify-end gap-2">
      <SearchTrigger />
      <ThemeSwitcher />
      <Button>{"Kirish/Ro'yxatdan o'tish"}</Button>
    </div>
  );
};
