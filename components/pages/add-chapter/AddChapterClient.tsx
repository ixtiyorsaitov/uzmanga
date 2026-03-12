"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/layout/wrapper";
import DefaultCard from "@/components/pages/manga-actions/DefaultCard";
import Image from "next/image";
import { Trash2, GripVertical, UploadCloud } from "lucide-react";
import { useCreateChapter } from "@/components/hooks/api/useChapters";
import { appToast } from "@/lib/app-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface ChapterForm {
  title: string;
  chapterNumber: string;
  volumeNumber: string;
  price: string;
  isLocked: boolean;
  disableComments: boolean;
}

interface PageItem {
  id: string;
  file: File;
  preview: string;
}

const AddChapterClient = ({
  mangaId,
  slug: mangaSlug,
}: {
  mangaId: string;
  slug: string;
}) => {
  const [pages, setPages] = useState<PageItem[]>([]);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const mutation = useCreateChapter();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChapterForm>({
    defaultValues: {
      title: "",
      chapterNumber: "",
      volumeNumber: "1",
      price: "0",
      isLocked: false,
      disableComments: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const newPages = selectedFiles.map((file) => ({
        id: Math.random().toString(36).substring(7),
        file,
        preview: URL.createObjectURL(file),
      }));
      setPages((prev) => [...prev, ...newPages]);
    }
  };

  const removePage = (idToRemove: string) => {
    setPages((prev) => prev.filter((page) => page.id !== idToRemove));
  };

  const handleSort = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      let _pages = [...pages];
      const draggedItemContent = _pages.splice(dragItem.current, 1)[0];
      _pages.splice(dragOverItem.current, 0, draggedItemContent);

      dragItem.current = null;
      dragOverItem.current = null;
      setPages(_pages);
    }
  };

  const onSubmit = async (data: ChapterForm) => {
    if (pages.length === 0) {
      alert("Iltimos, kamida bitta sahifa yuklang!");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("chapterNumber", data.chapterNumber);
    formData.append("volumeNumber", data.volumeNumber);
    formData.append("price", data.price);
    formData.append("isLocked", String(data.isLocked));
    formData.append("disableComments", String(data.disableComments));

    // Massivdagi rasmlarni ketma-ket qo'shamiz
    // Backend aynan shu tartibda qabul qilib, index asosida pageNumber beradi
    pages.forEach((page) => {
      formData.append("pages", page.file);
    });

    console.log("Yuborilayotgan ma'lumotlar tayyor!", formData);

    mutation.mutate(
      { mangaId, data: formData },
      {
        onSuccess: (res) => {
          console.log(res);

          appToast.success(res.message, {
            description: "Iltimos, ma'lumotlarni qayta tekshirib ko'ring.",
          });

          queryClient.invalidateQueries({
            queryKey: ["chapters", mangaId],
          });

          router.push(`/mangas/${mangaSlug}/chapters`);
        },
        onError: (error: any) => {
          const message = error.message || "Kutilmagan xatolik yuz berdi";

          appToast.error(message, {
            description: "Iltimos, ma'lumotlarni qayta tekshirib ko'ring.",
          });

          console.error("[CreateChapter Error]:", error);
        },
      },
    );
    // API so'rovingizni shu yerda chaqirasiz (masalan, axios.post)
    // await api.post(`/mangas/${mangaId}/chapters`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  };

  useEffect(() => {
    return () => {
      pages.forEach((page) => URL.revokeObjectURL(page.preview));
    };
  }, [pages]);

  return (
    <Wrapper contentClassName="mt-5 mb-10">
      <h1 className="text-2xl font-bold mb-6">Yangi bob qo'shish</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row gap-6"
      >
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <DefaultCard className="p-4 flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Bob raqami *
              </label>
              <Input
                type="number"
                step="0.1"
                {...register("chapterNumber", { required: true })}
                placeholder="Masalan: 12.5"
              />
              {errors.chapterNumber && (
                <span className="text-red-500 text-xs">
                  Bob raqami majburiy
                </span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Bob sarlavhasi (Ixtiyoriy)
              </label>
              <Input
                {...register("title")}
                placeholder="Sarlavha kiritish..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Tom (Volume)
                </label>
                <Input
                  type="number"
                  {...register("volumeNumber")}
                  defaultValue="1"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Narxi (Coin)
                </label>
                <Input type="number" {...register("price")} defaultValue="0" />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="isLocked"
                {...register("isLocked")}
                className="w-4 h-4"
              />
              <label htmlFor="isLocked" className="text-sm cursor-pointer">
                Pullik bob (Qulflangan)
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="disableComments"
                {...register("disableComments")}
                className="w-4 h-4"
              />
              <label
                htmlFor="disableComments"
                className="text-sm cursor-pointer"
              >
                Izohlarni o'chirish
              </label>
            </div>
          </DefaultCard>

          <Button type="submit" size="lg" className="w-full mt-2">
            Bobni Saqlash
          </Button>
        </div>

        {/* O'NG TOMON: Rasmlar yuklash va tartiblash */}
        <div className="w-full lg:w-2/3">
          <DefaultCard className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Bob sahifalari</h2>
                <p className="text-sm text-muted-foreground">
                  Sahifalarni yuklang va kerakli tartibda surib joylashtiring.
                </p>
              </div>

              {/* Fayl tanlash tugmasi */}
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="secondary" className="pointer-events-none">
                  <UploadCloud className="w-4 h-4 mr-2" />
                  Rasm yuklash
                </Button>
              </div>
            </div>

            {/* Yuklangan rasmlar ro'yxati (Drag & Drop hududi) */}
            <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
              {pages.length === 0 ? (
                <div className="w-full h-32 border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground bg-muted/20">
                  Hali rasmlar yuklanmadi
                </div>
              ) : (
                pages.map((page, index) => (
                  <div
                    key={page.id}
                    draggable
                    onDragStart={() => (dragItem.current = index)}
                    onDragEnter={() => (dragOverItem.current = index)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex items-center gap-4 p-2 bg-card border rounded-lg shadow-sm hover:border-primary/50 transition-colors cursor-grab active:cursor-grabbing group"
                  >
                    {/* Drag Handle Icon */}
                    <div className="text-muted-foreground opacity-50 group-hover:opacity-100 pl-1">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    {/* Sahifa raqami */}
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-sm shrink-0">
                      {index + 1}
                    </div>

                    {/* Rasm */}
                    <div className="relative w-16 h-20 shrink-0 bg-muted rounded overflow-hidden">
                      <Image
                        src={page.preview}
                        alt={`Page ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Rasm nomi */}
                    <div className="flex-1 truncate text-sm">
                      {page.file.name}
                    </div>

                    {/* O'chirish tugmasi */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removePage(page.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </DefaultCard>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddChapterClient;
