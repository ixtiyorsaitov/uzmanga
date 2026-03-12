"use client";

import Wrapper from "@/components/layout/wrapper";
import UploadBanner from "../UploadBanner";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mangaSchema, MangaSchema } from "@/lib/validations/manga.validations";
import Description from "../Description";
import MangaTags from "../MangaTags";
import { Button } from "@/components/ui/button";
import MessageToModerator from "../MessageToModerator";
import useSelectBannerImageStore from "@/store/useSelectBannerImageStore";
import useSelectCoverImageStore from "@/store/useSelectCoverImageStore";
import { useCreateManga } from "@/components/hooks/api/useManga";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import MangaFields from "../MangaFields";

export default function AddMangaClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
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

  const { mutate: createMutation } = useCreateManga();

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
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("releaseYear", String(data.releaseYear));
    formData.append("type", data.type);
    formData.append("ageRating", data.ageRating);
    formData.append("status", data.status);
    formData.append("translationStatus", data.translationStatus);

    formData.append("categories", JSON.stringify(data.categories || []));
    formData.append("genres", JSON.stringify(data.genres || []));

    if (bannerFile) formData.append("banner", bannerFile);
    if (coverFile) formData.append("cover", coverFile);

    createMutation(formData, {
      onSuccess: (res) => {
        console.log(res);

        queryClient.invalidateQueries({ queryKey: ["mangas"] });

        toast.success("Manga muvaffaqiyatli moderatorga yuborildi!");

        router.push("/");
      },
      onError: (error: any) => {
        const message = error.message || "Kutilmagan xatolik yuz berdi";

        toast.error(message, {
          description: "Iltimos, ma'lumotlarni qayta tekshirib ko'ring.",
        });

        console.error("[CreateManga Error]:", error);
      },
    });
  };

  // useEffect(() => {
  //   if (bannerFile) setBannerError(false);
  // }, [bannerFile]);

  return (
    <Wrapper contentClassName="flex flex-col gap-4 mt-5">
      <FormProvider {...form}>
        <form
          id="create-manga"
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
}
