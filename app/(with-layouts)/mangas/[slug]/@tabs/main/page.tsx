import { MangaDescription } from "@/components/pages/manga/manga-description";
import MangaDetailedInfo from "@/components/pages/manga/manga-detailed-info";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import MangaService from "@/services/manga.service";
import Link from "next/link";

export default async function MainTabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await MangaService.getManga(slug);
  const manga = response.data;

  return (
    manga && (
      <div className="space-y-2">
        <MangaDescription htmlContent={manga.description} />

        <div className="blur-card">
          {manga.categories.map((category) => (
            <Link
              href={`/mangas?categories=${category._id}`}
              className={cn(
                badgeVariants({ variant: "secondary" }),
                "hover:bg-secondary hover:text-primary bg-transparent transition cursor-pointer text-sm",
              )}
              key={category._id}
            >
              {category.name}
            </Link>
          ))}
          {manga.genres.map((category) => (
            <Link
              href={`/mangas?categories=${category._id}`}
              className={cn(
                badgeVariants({ variant: "secondary" }),
                "hover:bg-secondary hover:text-primary bg-transparent transition cursor-pointer text-sm",
              )}
              key={category._id}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <MangaDetailedInfo manga={manga} />
      </div>
    )
  );
}
