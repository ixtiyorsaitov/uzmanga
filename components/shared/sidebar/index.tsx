"use client";

import useSidebar from "@/components/hooks/useSidebar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useUser } from "@/components/contexts/user.context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LogoutIcon from "@/components/icons/logout.icon";
import ProfileWidget from "@/components/features/user/ProfileWidget";
import MenuList from "./MenuList";

const SidebarSheet = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { open, setOpen } = useSidebar();
  const { status } = useUser();

  const isAuthenticated = status !== "authenticated";

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        closeButton={false}
        className="border-none! outline-none! p-4 overflow-auto scrollbar-thin"
      >
        <SheetTitle className="hidden" />
        <SheetHeader className="p-0!">
          {!isAuthenticated ? (
            <Button>{"Kirish/Ro'yxatdan o'tish"}</Button>
          ) : (
            <ProfileWidget />
          )}
        </SheetHeader>
        <div className="flex items-center justify-start flex-col gap-y-2 mt-3">
          <MenuList isAuthenticated={isAuthenticated} />
          {isAuthenticated && (
            <>
              <div className="w-full flex items-center justify-start">
                <Link
                  href={"/"}
                  className={cn(buttonVariants({ variant: "ghost" }), "px-0!")}
                >
                  {"Qo'llanmani to'ldiring"}
                </Link>
              </div>
              <Separator />
            </>
          )}
          <div
            onClick={toggleTheme}
            className="w-full flex items-center justify-between mt-3"
          >
            <h1 className="text-md font-semibold">Tungi rejim</h1>
            <Switch className="scale-105" checked={resolvedTheme === "dark"} />
          </div>

          {isAuthenticated && (
            <>
              <Separator />
              <div className="w-full flex items-center justify-start">
                <Button variant={"ghost"} className="px-0! text-destructive">
                  <LogoutIcon />
                  {"Chiqish"}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
