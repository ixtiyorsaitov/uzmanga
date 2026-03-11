import EditMangaClient from "@/components/pages/manga-actions/edit/EditMangaClient";
import mangaService from "@/services/manga.service";

export default async function EditMangaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const manga = await mangaService.getManga(slug);
  console.log(manga);

  return <EditMangaClient manga={manga} />;
}
