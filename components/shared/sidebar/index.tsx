"use client";

import useSidebar from "@/components/hooks/useSidebar";
import BellIcon from "@/components/icons/bell.icon";
import BookmarkIcon from "@/components/icons/bookmark.icon";
import MenuIcon from "@/components/icons/menu.icon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  isNew?: boolean;
  submenu?: MenuItem[];
}
const menuItems: MenuItem[] = [
  {
    label: "Xatcho'plar",
    icon: <BookmarkIcon />,
    href: "#",
  },
  {
    label: "Bildirishnomalar",
    icon: <BellIcon />,
    href: "#",
  },
  {
    label: "Chat",
    icon: "💬",
    href: "#",
    isNew: true,
  },
  {
    label: "Каталог",
    icon: <MenuIcon />,
    submenu: [
      { label: "Тайтлов", icon: "◦" },
      { label: "Карт", icon: "◦" },
      { label: "Шортсы", icon: "◦", isNew: true },
    ],
  },
  {
    label: "Форум",
    icon: "👥",
    href: "#",
  },
  {
    label: "Магазин",
    icon: "🛍️",
    href: "#",
  },
  {
    label: "Топы",
    icon: "🏆",
    submenu: [
      { label: "Тайтлов", icon: "◦" },
      { label: "Пользователей", icon: "◦" },
      { label: "Гильдий", icon: "◦" },
    ],
  },
];
const SidebarSheet = () => {
  const { open, setOpen } = useSidebar();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent closeButton={false} className="border-none! outline-none! ">
        <SheetTitle className="hidden"/>
        <SheetHeader>
          <Button>{"Kirish/Ro'yxatdan o'tish"}</Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
