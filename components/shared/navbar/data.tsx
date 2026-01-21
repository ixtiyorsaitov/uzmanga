import {
  ChatIcon,
  HistoryIcon,
  MedalIcon,
  NoteIcon,
  SettingsIcon,
  StoreIcon,
  TransactionIcon,
} from "@/components/icons";

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  submenu?: DropdownItem[];
  hr?: boolean;
}

export const dropdownItems: DropdownItem[] = [
  {
    label: "Uz: Pass",
    icon: <MedalIcon className="size-5" />,
    href: "#",
  },
  {
    label: "O'qish tarixi",
    icon: <HistoryIcon className="size-5" />,
    href: "#",
  },
  {
    label: "Mening so'rovlarim",
    icon: <NoteIcon className="size-5" />,
    href: "#",
  },
  {
    label: "Fikr-mulohaza",
    icon: <ChatIcon className="size-5" />,
    href: "#",
  },
  {
    label: "Kontent yaratish",
    href: "#",
    submenu: [
      { label: "Manga", href: "#" },
      { label: "Jamoa", href: "#" },
      { label: "Gildiya", href: "#" },
      { label: "Personaj", href: "#" },
      { label: "Yaratuvchi", href: "#" },
      { label: "Kart", href: "#" },
      { label: "Kolleksiya", href: "#" },
      { label: "Kviz", href: "#" },
    ],
    hr: true,
  },
  {
    label: "Do'kon",
    icon: <StoreIcon className="size-5" />,
    href: "#",
  },
  {
    label: "Sozlamalar",
    icon: <SettingsIcon className="size-5" />,
    href: "#",
  },
  {
    label: "To'lovlarim",
    icon: <TransactionIcon className="size-5" />,
    href: "#",
  },
];
