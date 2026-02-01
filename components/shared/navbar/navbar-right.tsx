"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import SearchTrigger from "./search-trigger";
import { Skeleton } from "@/components/ui/skeleton";
import { BellIcon, BookmarkIcon, ChatIcon } from "@/components/icons";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthModal from "@/components/hooks/modals/useAuthModal";
import AuthModal from "@/components/modals/auth";
import { useAuth } from "@/components/contexts/auth.context";

const ThemeSwitcher = dynamic(() => import("@/components/ui/theme-switcher"), {
  ssr: false,
  loading: () => <Skeleton className="size-9 rounded-full" />,
});

const UserDropdown = dynamic(
  () => import("@/components/shared/navbar/user.dropdown"),
  {
    ssr: false,
    loading: () => null,
  },
);

export const NavbarRight = () => {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user && !loading;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { open: authOpen, setOpen: setAuthOpen } = useAuthModal();

  return (
    <div className="flex items-center justify-end gap-2">
      <SearchTrigger />
      {isAuthenticated ? (
        <>
          <Button className="gap-1 lg:flex hidden" variant={"secondary"}>
            <BookmarkIcon className="size-5" />
            {"Xatcho'plar"}
          </Button>
          <Button
            size={"icon"}
            className="gap-1 lg:hidden"
            variant={"secondary"}
          >
            <BookmarkIcon className="size-5" />
          </Button>
          <Button variant={"secondary"} size={"icon"}>
            <ChatIcon className="size-5" />
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
        </>
      ) : (
        <>
          <ThemeSwitcher />
          <Button onClick={() => setAuthOpen(true)}>
            {"Kirish/Ro'yxatdan o'tish"}
          </Button>
          <AuthModal />
        </>
      )}
    </div>
  );
};
