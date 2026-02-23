"use client";

import ImageIcon from "@/components/icons/image.icon";
import DefaultCard from "@/components/pages/manga-add/DefaultCard";
import { Button } from "@/components/ui/button";
import useSelectBannerImageStore from "@/store/useSelectBannerImageStore";
import Image from "next/image";
import React from "react";
import SelectBannerImageModal from "./select.banner.image.modal";

export default function UploadBanner() {
  const { setOpen, bannerPreview, removeBanner } = useSelectBannerImageStore();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeBanner();
  };
  return (
    <DefaultCard
      onClick={() => !bannerPreview && setOpen(true)}
      className="h-[318px] relative bg-card flex items-center justify-center overflow-hidden border-2"
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
              className="gap-2 text-xs! h-[30px]"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              O'zgartirish
            </Button>

            <Button
              size="sm"
              variant="destructive"
              className="gap-2 text-xs! h-[30px]"
              onClick={handleRemove}
            >
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

      <SelectBannerImageModal />
    </DefaultCard>
  );
}
