import {
  BellIcon,
  BookmarkIcon,
  ChatIcon,
  ForumIcon,
  HistoryIcon,
  MedalIcon,
  MenuIcon,
  RankingIcon,
  StoreIcon,
  TransactionIcon,
  EditIcon,
  NoteIcon,
  SettingsIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

export const buttonStyle = "flex items-center justify-start gap-2 px-0!";

export type HrType = "onlyAuth" | "whatever" | "onlyGuest";

export const defineSeperatorClassnameByHrType = (
  hrType: HrType,
  isAuthenticated: boolean,
) => {
  return cn(
    hrType === "whatever"
      ? "flex"
      : hrType === "onlyAuth"
        ? isAuthenticated
          ? "flex"
          : "hidden"
        : hrType === "onlyGuest"
          ? !isAuthenticated
            ? "flex"
            : "hidden"
          : "hidden",
  );
};

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  isNew?: boolean;
  hr?: HrType;
  submenu?: MenuItem[];
  onlyAuth?: boolean;
  premiumBtn?: boolean;
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
    icon: <ChatIcon />,
    href: "#",
    isNew: true,
    premiumBtn: true,
  },
  {
    label: "Uz: Pass",
    icon: <MedalIcon />,
    onlyAuth: true,
    href: "#",
  },
  {
    label: "Katalog",
    icon: <MenuIcon />,
    submenu: [
      { label: "Mangalar" },
      { label: "Kart" },
      { label: "Shorts", isNew: true },
    ],
  },
  {
    label: "Forum",
    icon: <ForumIcon />,
    href: "#",
    hr: "onlyGuest",
  },
  {
    label: "O'qish tarixi",
    icon: <HistoryIcon />,
    href: "#",
    onlyAuth: true,
  },
  {
    label: "Fikr-mulohaza",
    icon: <ChatIcon />,
    href: "#",
    onlyAuth: true,
    hr: "onlyAuth",
  },
  {
    label: "Do'kon",
    icon: <StoreIcon />,
    href: "#",
  },
  {
    label: "Top",
    icon: <RankingIcon />,
    submenu: [
      { label: "Mangalar" },
      { label: "Foydalanuvchilar" },
      { label: "Gildiyalar" },
    ],
    hr: "whatever",
  },
  {
    label: "Sozlamalar",
    icon: <SettingsIcon />,
    href: "#",
    onlyAuth: true,
  },
  {
    label: "To'lovlarim",
    icon: <TransactionIcon />,
    href: "#",
    onlyAuth: true,
  },
  {
    label: "Mening kontentlarim",
    icon: <NoteIcon />,
    href: "#",
    onlyAuth: true,
  },
  {
    label: "Kontent qo'shish",
    icon: <EditIcon />,
    href: "#",
    onlyAuth: true,
    submenu: [
      { label: "Manga" },
      { label: "Jamoa" },
      { label: "Gildiya" },
      { label: "Personaj" },
      { label: "Yaratuvchi" },
      { label: "Kartochka" },
      { label: "Kolleksiya" },
      { label: "Kviz" },
    ],
    hr: "onlyAuth",
  },
];

export default menuItems;
