"use client";

import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";

interface ImageCropperProps {
  image: string;
  aspect: number;
  onConfirm: (file: File) => void;
  onCancel: () => void;
}

export default function ImageCropper({
  image,
  aspect,
  onConfirm,
  onCancel,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, aspect, width, height),
      width,
      height,
    );
    setCrop(initialCrop);
  }

  const handleConfirmClick = async () => {
    if (!imgRef.current || !completedCrop) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height,
      );
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], "cropped-image.webp", {
          type: "image/webp",
        });
        onConfirm(file);
      },
      "image/webp",
      0.9,
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full overflow-hidden">
      <div className="relative w-full flex items-center justify-center bg-black/5 rounded-lg overflow-hidden border">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          className="max-w-full"
        >
          <img
            ref={imgRef}
            src={image}
            alt="Crop"
            onLoad={onImageLoad}
            className="max-w-full block object-contain"
          />
        </ReactCrop>
      </div>

      <div className="flex justify-end gap-3 w-full pt-2">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Bekor qilish
        </Button>
        <Button size="sm" onClick={handleConfirmClick}>
          Tasdiqlash
        </Button>
      </div>
    </div>
  );
}
