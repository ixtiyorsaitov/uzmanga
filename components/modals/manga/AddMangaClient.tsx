"use client";

import Wrapper from "@/components/layout/wrapper";
import UploadBanner from "./UploadBanner";
import AddMangaTitles from "./AddMangaTitles";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mangaSchema, MangaSchema } from "@/lib/validations/manga.validations";
import Description from "./Description";
import MangaTags from "./MangaTags";

export default function AddMangaClient() {
  const form = useForm<MangaSchema>({
    resolver: zodResolver(mangaSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  });

  const onSubmit = (data: MangaSchema) => {
    console.log("Forma yuborildi: ", data);
  };

  return (
    <Wrapper className="mt-5" contentClassName="flex flex-col gap-4">
      <FormProvider {...form}>
        <form
          id="create-manga"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <UploadBanner />
          <AddMangaTitles />
          <Description />
          <MangaTags />
          <button type="submit" className="btn-primary">
            Saqlash
          </button>
        </form>
      </FormProvider>
    </Wrapper>
  );
}
