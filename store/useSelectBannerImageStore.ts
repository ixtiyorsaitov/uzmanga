import { create } from "zustand";

interface BannerImageState {
  open: boolean;
  bannerFile: File | null;
  bannerPreview: string | null;
  bannerError: boolean;
  setOpen: (open: boolean) => void;
  setBanner: (file: File) => void;
  setBannerError: (error: boolean) => void;
  removeBanner: () => void;
  setBannerPreview: (url: string) => void;
}

const useSelectBannerImageStore = create<BannerImageState>((set) => ({
  open: false,
  bannerFile: null,
  bannerPreview: null,
  bannerError: false,

  setOpen: (open) => set({ open }),

  setBanner: (file: File) =>
    set({
      bannerFile: file,
      bannerPreview: URL.createObjectURL(file),
      bannerError: false,
    }),
  setBannerPreview: (url: string) =>
    set({
      bannerPreview: url,
      bannerFile: null,
      bannerError: false,
    }),

  setBannerError: (error) => set({ bannerError: error }),

  removeBanner: () =>
    set({
      bannerFile: null,
      bannerPreview: null,
      open: false,
      bannerError: false,
    }),
}));

export default useSelectBannerImageStore;
