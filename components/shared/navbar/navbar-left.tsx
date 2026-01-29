import AlbumIcon from "@/components/icons/album.icon";
import FilmIcon from "@/components/icons/film.icon";
import RankingIcon from "@/components/icons/ranking.icon";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import SeparatorY from "@/components/ui/separator-y";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

const NavbarLeft = () => {
  const items = [
    { label: "Katalog", href: "/katalog" },
    { label: "Top", href: "/top" },
    { label: "Forum", href: "/forum" },
  ];

  const moreMenu = [
    {
      title: "Katalog kart",
      description: "Hamma kartalar katalogi",
      icon: <AlbumIcon className="size-6" />,
      href: "/cards",
    },
    {
      title: "Tops foydalanuvchilar",
      description: "Reytingda nechanchi o'rindasiz?",
      icon: <RankingIcon className="size-6" />,
      href: "/top-users",
    },
    {
      title: "Tops gildiyalar",
      description: "Eng kuchli gildiyalar reytingi",
      icon: <RankingIcon className="size-6" />,
      href: "/top-guilds",
    },
    {
      title: "Shortslar",
      description: "Eng sara lahzalar to'plami",
      icon: <FilmIcon className="size-6" />,
      href: "/shorts",
    },
  ];

  return (
    <div className="flex items-center justify-start gap-2">
      <div className="mr-3">
        <Logo winter />
      </div>
      <div className="flex items-center justify-center gap-2">
        {items.map((item) => (
          <Button
            key={item.label}
            asChild
            className="px-6!"
            variant="secondary"
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}

        <SeparatorY className="mx-1 h-6 w-0.5" />

        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="secondary" className="rounded-full px-3">
              <MoreHorizontalIcon size={20} />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-100 overflow-hidden rounded-2xl p-2 border-none"
          >
            <div className="flex flex-col gap-1 space-y-1">
              {moreMenu.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.href}
                  className="hover:bg-muted! select-none border-muted flex items-center justify-start gap-0 rounded-md py-2 transition-colors border"
                >
                  <div className="pl-3 text-foreground/80 flex items-center justify-center ">
                    {menu.icon}
                  </div>
                  <div className="flex flex-col gap-0.5 px-4 py-2">
                    <span className="text-md font-semibold leading-none">
                      {menu.title}
                    </span>
                    <span className="text-muted-foreground text-sm leading-tight">
                      {menu.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};
export default NavbarLeft;
