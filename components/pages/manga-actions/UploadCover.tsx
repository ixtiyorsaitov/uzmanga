"use client";

import ImageIcon from "@/components/icons/image.icon";
import SelectCoverImageModal from "@/components/modals/manga/select.cover.image.modal";
import DefaultCard from "@/components/pages/manga-actions/DefaultCard";
import { Button } from "@/components/ui/button";
import useSelectCoverImageStore from "@/store/useSelectCoverImageStore";
import Image from "next/image";
import React from "react";

const UploadCover = () => {
  const { setOpen, coverPreview, removeCover, coverError } =
    useSelectCoverImageStore();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeCover();
  };

  return (
    <div className="flex flex-col gap-2">
      <DefaultCard
        onClick={() => !coverPreview && setOpen(true)}
        // Xatolik bo'lsa border-destructive klassini qo'shamiz
        className={`w-[214px] h-[320px] relative bg-card flex items-center justify-center overflow-hidden cursor-pointer border-2 transition-all ${
          coverError
            ? "border-destructive ring-1 ring-destructive/20"
            : "border-none"
        }`}
      >
        {coverPreview ? (
          <>
            <Image
              src={coverPreview}
              alt="Cover Preview"
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-1 z-20 flex-col">
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
            <ImageIcon className="size-10" />
            <span className="text-xs text-center px-2">Muqova yuklash</span>
          </div>
        )}

        <SelectCoverImageModal />
      </DefaultCard>

      {/* Xato xabari */}
      {coverError && (
        <span className="text-destructive text-[11px] font-medium text-center w-[214px]">
          Muqova yuklanishi shart!
        </span>
      )}
    </div>
  );
};

export default UploadCover;
