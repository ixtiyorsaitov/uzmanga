import Wrapper from "@/components/layout/wrapper";
import { MangaTabs } from "@/components/pages/manga/manga-tabs";
import MangaService from "@/services/manga.service";
import React from "react";
import NotFound from "./not-found";
import MainLayout from "@/components/pages/manga/main-layout";
import AsideLayout from "@/components/pages/manga/aside-layout";
import SimilarMangas from "@/components/pages/manga/similar-mangas";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
  tabs: React.ReactNode;
}

const MangaPageLayout = async ({ children, params, tabs }: Props) => {
  const { slug } = await params;
  const response = await MangaService.getManga(slug);
  const manga = response.data;

  if (!response.success || !manga) {
    return <NotFound msg={response.message} />;
  }

  return (
    <Wrapper>
      <div className="fixed inset-0 w-full h-[600px] -z-10 overflow-hidden">
        <Image
          src={manga.images.banner.url}
          alt="background"
          fill
          priority
          className="object-cover blur- opacity-40"
        />

        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-10 relative md:items-start items-center">
        <AsideLayout manga={manga} />

        <main className="flex-1 min-w-0 w-full">
          <div className="w-full">
            <MainLayout manga={manga} />

            <MangaTabs slug={slug} />
            <div className="w-full flex items-start justify-between gap-2 mt-3">
              <section className="flex-1">
                {tabs} {children}
              </section>
              <SimilarMangas />
            </div>
          </div>
        </main>
      </div>
    </Wrapper>
  );
};

export default MangaPageLayout;
