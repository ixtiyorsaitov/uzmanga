import { create } from "zustand";

interface BannerImageState {
  open: boolean;
  bannerFile: File | null;
  bannerPreview: string | null;
  setOpen: (open: boolean) => void;
  setBanner: (file: File) => void;
  removeBanner: () => void;
}

const useSelectBannerImageStore = create<BannerImageState>((set) => ({
  open: false,
  bannerFile: null,
  bannerPreview: null,
  setOpen: (open) => set({ open }),
  setBanner: (file: File) =>
    set({
      bannerFile: file,
      bannerPreview: URL.createObjectURL(file),
    }),
  removeBanner: () =>
    set({
      bannerFile: null,
      bannerPreview: null,
      open: false,
    }),
}));

export default useSelectBannerImageStore;
