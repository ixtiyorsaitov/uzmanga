"use client";

import Wrapper from "@/components/layout/wrapper";
import { mangaSchema, MangaSchema } from "@/lib/validations/manga.validations";
import { IManga } from "@/types/manga";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import UploadBanner from "../UploadBanner";
import Description from "../Description";
import MangaTags from "../MangaTags";
import MessageToModerator from "../MessageToModerator";
import { Button } from "@/components/ui/button";
import MangaFields from "../MangaFields";
import { getDirtyValues } from "@/lib/utils";
import useSelectBannerImageStore from "@/store/useSelectBannerImageStore";
import useSelectCoverImageStore from "@/store/useSelectCoverImageStore";
import { useUpdateManga } from "@/components/hooks/api/useManga";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@/components/contexts/auth.context";

const EditMangaClient = ({ manga }: { manga: IManga }) => {
  const { user } = useAuth();
  const { setBannerPreview, removeBanner } = useSelectBannerImageStore();
  const { setCoverPreview, removeCover } = useSelectCoverImageStore();

  const { mutate: updateMutation, isPending } = useUpdateManga();

  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<MangaSchema>({
    resolver: zodResolver(mangaSchema),
    defaultValues: {
      title: manga.title,
      description: manga.description,
      tags: manga.seo?.focusKeywords || [],
      releaseYear: String(manga.releaseYear),
      type: manga.type._id || "",
      ageRating: manga.ageRating._id,
      status: manga.status._id,
      translationStatus: manga.translationStatus._id,
      categories: manga.categories.map((category) => category._id),
      genres: manga.genres.map((genre) => genre._id),
    },
  });

  const { dirtyFields } = form.formState;

  const onSubmit = (data: MangaSchema) => {
    document.body.style.overflowY = "auto";

    const { bannerFile } = useSelectBannerImageStore.getState();
    const { coverFile } = useSelectCoverImageStore.getState();

    const updatedData = getDirtyValues(dirtyFields, data);

    const formData = new FormData();

    Object.entries(updatedData).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (bannerFile) {
      formData.append("banner", bannerFile);
    }

    if (coverFile) {
      formData.append("cover", coverFile);
    }
    updateMutation(
      { mangaId: manga._id, formData },
      {
        onSuccess: (res) => {
          console.log(res);

          queryClient.invalidateQueries({ queryKey: ["mangas", manga._id] });

          toast.success(res.message);

          router.push(`/mangas/${manga.slug}`);
        },
        onError: (error: any) => {
          const message = error.message || "Kutilmagan xatolik yuz berdi";

          toast.error(message);

          console.error("[CreateManga Error]:", error);
        },
      },
    );
  };

  useEffect(() => {
    if (manga.images?.banner?.url) {
      setBannerPreview(manga.images.banner.url);
    }

    if (manga.images?.cover?.url) {
      setCoverPreview(manga.images.cover.url);
    }

    return () => {
      removeBanner();
      removeCover();
    };
  }, [manga, setBannerPreview, removeBanner, setCoverPreview, removeCover]);

  if (!user || user._id !== manga.createdBy._id) {
    notFound();
  }
  return (
    <Wrapper contentClassName="flex flex-col gap-4 mt-5">
      <FormProvider {...form}>
        <form
          id="edit-manga"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <UploadBanner />
          <MangaFields />
          <Description />
          <MangaTags />
          <MessageToModerator />
          <Button type="submit">Moderatorga yuborish</Button>
        </form>
      </FormProvider>
    </Wrapper>
  );
};

export default EditMangaClient;
