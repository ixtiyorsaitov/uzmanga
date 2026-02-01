"use client";

import CatalogIcon from "@/components/icons/catalog.icon";
import Logo from "../logo";
import BookmarkIcon from "@/components/icons/bookmark.icon";
import BellIcon from "@/components/icons/bell.icon";
import MenuIcon from "@/components/icons/menu.icon";
import useAuthModal from "@/components/hooks/useSidebar";
import dynamic from "next/dynamic";

const SidebarSheet = dynamic(() => import("@/components/shared/sidebar"), {
  ssr: false,
});

const BottomNav = () => {
  const { setOpen, open } = useAuthModal();
  return (
    <>
      <div className="fixed bottom-0 z-50 w-full bg-background md:hidden flex items-center justify-center gap-1 px-2">
        <div className="py-2 text-muted-foreground space-y-1 text-xs w-full flex items-center justify-center flex-col">
          <CatalogIcon className="w-4! h-4!" />
          Katalog
        </div>
        <div className="py-2 text-muted-foreground space-y-1 text-xs w-full flex items-center justify-center flex-col">
          <BookmarkIcon className="w-4! h-4!" />
          {"Xatcho'p"}
        </div>
        <div className="py-2 text-muted-foreground space-y-1 text-xs w-full flex items-center justify-center flex-col">
          <Logo />
        </div>
        <div className="py-2 text-muted-foreground space-y-1 text-xs w-full flex items-center justify-center flex-col">
          <BellIcon className="w-4! h-4!" />
          Xabarlar
        </div>
        <div
          onClick={() => setOpen(true)}
          onTouchStart={() => import("@/components/shared/sidebar")}
          className="py-2 text-muted-foreground space-y-1 text-xs w-full flex items-center justify-center flex-col"
        >
          <MenuIcon className="w-4! h-4!" />
          Menyu
        </div>
      </div>
      {open && <SidebarSheet />}
    </>
  );
};

export default BottomNav;
