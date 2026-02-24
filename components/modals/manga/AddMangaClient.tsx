"use client";

import Wrapper from "@/components/layout/wrapper";
import UploadBanner from "./UploadBanner";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mangaSchema, MangaSchema } from "@/lib/validations/manga.validations";
import Description from "./Description";
import MangaTags from "./MangaTags";
import { Button } from "@/components/ui/button";
import MessageToModerator from "./MessageToModerator";
import { useEffect } from "react";
import useSelectBannerImageStore from "@/store/useSelectBannerImageStore";
import useSelectCoverImageStore from "@/store/useSelectCoverImageStore";
import AddMangaFields from "./AddMangaTitles";

export default function AddMangaClient() {
  const form = useForm<MangaSchema>({
    resolver: zodResolver(mangaSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  });

  const { bannerFile, setBannerError } = useSelectBannerImageStore();
  const { coverFile, setCoverError } = useSelectCoverImageStore();

  const onSubmit = (data: MangaSchema) => {
    let hasError = false;

    if (!bannerFile) {
      setBannerError(true);
      hasError = true;
    }

    if (!coverFile) {
      setCoverError(true);
      hasError = true;
    }

    if (hasError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    console.log("Hamma ma'lumotlar tayyor!", {
      ...data,
      bannerFile,
      coverFile,
    });
  };

  useEffect(() => {
    if (bannerFile) setBannerError(false);
  }, [bannerFile]);

  return (
    <Wrapper className="mt-5" contentClassName="flex flex-col gap-4">
      <FormProvider {...form}>
        <form
          id="create-manga"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <UploadBanner />
          <AddMangaFields />
          <Description />
          <MangaTags />
          <MessageToModerator />
          <Button type="submit">Moderatorga yuborish</Button>
        </form>
      </FormProvider>
    </Wrapper>
  );
}
