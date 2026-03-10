"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const MangaTabs = ({ slug }: { slug: string }) => {
  const pathname = usePathname();

  const tabs = [
    { name: "Asosiy", href: `/mangas/${slug}/main`, id: "main" },
    { name: "Boblar", href: `/mangas/${slug}/chapters`, id: "chapters" },
    {
      name: "Izohlar",
      href: `/mangas/${slug}/comments`,
      id: "comments",
    },
  ];

  return (
    <div className="flex p-1 blur-card rounded-full w-fit gap-2 mt-6">
      {tabs.map((tab) => {
        const isActive = pathname.includes(tab.href);

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "rounded-full px-6 py-1.5 text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-accent",
              tab.id === "comments" && "md:hidden",
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};
