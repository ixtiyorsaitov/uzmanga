import React from "react";
import AddChapterClient from "@/components/pages/add-chapter/AddChapterClient";
import mangaService from "@/services/manga.service";

export default async function AddChapter({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const manga = await mangaService.getManga(slug);
  if (!manga.success || !manga.data) return;
  return <AddChapterClient mangaId={manga.data._id} slug={slug} />;
}
