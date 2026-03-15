"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useChapterStore } from "@/store/chapter.store";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MoveVertical, MoveHorizontal } from "lucide-react";

const SettingsSheet = () => {
  const {
    settingsSheetOpen,
    setSettingsSheetOpen,
    brightness,
    setBrightness,
    containerWidth,
    setContainerWidth,
    imageGap,
    setImageGap,
    readingMode,
    setReadingMode,
  } = useChapterStore();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth < 640) {
        setContainerWidth(100);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setContainerWidth]);

  return (
    <Sheet open={settingsSheetOpen} onOpenChange={setSettingsSheetOpen}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Sozlamalar</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-8 py-6 px-2">
          {/* Yorug'lik (Brightness) */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Yorug'lik</Label>
              <span className="text-sm text-muted-foreground">
                {brightness}%
              </span>
            </div>
            <Slider
              value={[brightness]}
              onValueChange={(val) => setBrightness(val[0])}
              max={100}
              min={10}
              step={1}
            />
          </div>

          {/* Container Kengligi (Container Width) */}
          <div
            className={`space-y-3 ${isMobile ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="flex justify-between">
              <Label>
                Sahifa kengligi {isMobile && "(Telefonda doim 100%)"}
              </Label>
              <span className="text-sm text-muted-foreground">
                {isMobile ? 100 : containerWidth}%
              </span>
            </div>
            <Slider
              value={[isMobile ? 100 : containerWidth]}
              onValueChange={(val) => !isMobile && setContainerWidth(val[0])}
              max={100}
              min={40}
              step={5}
              disabled={isMobile}
            />
          </div>

          {/* Rasmlar orasidagi joy (Image Gap) */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Rasmlar orasidagi masofa</Label>
              <span className="text-sm text-muted-foreground">
                {imageGap}px
              </span>
            </div>
            <Slider
              value={[imageGap]}
              onValueChange={(val) => setImageGap(val[0])}
              max={50}
              min={0}
              step={2}
            />
          </div>

          {/* O'qish rejimi */}
          <div className="space-y-3">
            <Label>O'qish rejimi</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={readingMode === "vertical" ? "default" : "outline"}
                className="w-full"
                onClick={() => setReadingMode("vertical")}
              >
                <MoveVertical className="mr-2 h-4 w-4" />
                Vertikal
              </Button>
              <Button
                variant={readingMode === "horizontal" ? "default" : "outline"}
                className="w-full"
                onClick={() => setReadingMode("horizontal")}
              >
                <MoveHorizontal className="mr-2 h-4 w-4" />
                Gorizontal
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsSheet;
