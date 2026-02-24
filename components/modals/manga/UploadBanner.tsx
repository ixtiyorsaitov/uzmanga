"use client";

import React from "react";
import useSelectBannerImageStore from "@/store/useSelectBannerImageStore";
import DefaultCard from "@/components/pages/manga-add/DefaultCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ImageIcon from "@/components/icons/image.icon";
import SelectBannerImageModal from "./select.banner.image.modal";

export default function UploadBanner() {
  const { setOpen, bannerPreview, removeBanner, bannerError } =
    useSelectBannerImageStore();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeBanner();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <DefaultCard
        onClick={() => !bannerPreview && setOpen(true)}
        className={`h-[318px] relative bg-card flex items-center justify-center overflow-hidden border-2 cursor-pointer transition-colors ${
          bannerError ? "border-destructive" : "border-border"
        }`}
      >
        {bannerPreview ? (
          <>
            <Image
              src={bannerPreview}
              alt="Preview"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2 z-20 flex-col">
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
              >
                O'zgartirish
              </Button>
              <Button size="sm" variant="destructive" onClick={handleRemove}>
                O'chirish
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-50">
            <ImageIcon className="size-12" />
            <span>Banner yuklash</span>
          </div>
        )}
      </DefaultCard>

      <SelectBannerImageModal />

      {/* Agar xatolik bo'lsa, xabarni chiqaramiz */}
      {bannerError && (
        <span className="text-destructive text-sm font-medium">
          Manga banner rasmi yuklanishi shart!
        </span>
      )}
    </div>
  );
}
