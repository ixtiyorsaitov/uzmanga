import ImageCropper from "@/components/shared/image-cropper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSelectCoverImageStore from "@/store/useSelectCoverImageStore";
import { useEffect, useState } from "react";

const SelectCoverImageModal = () => {
  const { open, setOpen, setCover } = useSelectCoverImageStore();
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setOriginalImage(null);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[500px] max-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>Muqova rasmini tanlash</DialogTitle>
        </DialogHeader>

        {!originalImage ? (
          <div className="flex flex-col gap-4 w-full">
            <div className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const reader = new FileReader();
                    reader.onload = () =>
                      setOriginalImage(reader.result as string);
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <span className="text-sm text-muted-foreground">
                Rasm yuklash
              </span>
            </div>
          </div>
        ) : (
          <div className="overflow-auto max-h-[500px] scrollbar-thin">
            <ImageCropper
              image={originalImage}
              aspect={2 / 3}
              onConfirm={(file) => {
                setCover(file);
                setOpen(false);
              }}
              onCancel={() => setOpen(false)}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SelectCoverImageModal;
