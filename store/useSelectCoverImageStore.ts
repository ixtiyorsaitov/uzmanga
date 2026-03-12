import { create } from "zustand";

interface CoverImageState {
  open: boolean;
  coverFile: File | null;
  coverPreview: string | null;
  coverError: boolean;
  setOpen: (open: boolean) => void;
  setCover: (file: File) => void;
  setCoverPreview: (url: string) => void;
  setCoverError: (error: boolean) => void;
  removeCover: () => void;
}

const useSelectCoverImageStore = create<CoverImageState>((set) => ({
  open: false,
  coverFile: null,
  coverPreview: null,
  coverError: false,

  setOpen: (open) => set({ open }),

  setCoverPreview: (url: string) =>
    set({
      coverPreview: url,
      coverFile: null,
      coverError: false,
    }),

  setCover: (file: File) =>
    set({
      coverFile: file,
      coverPreview: URL.createObjectURL(file),
      coverError: false,
    }),

  setCoverError: (error) => set({ coverError: error }),

  removeCover: () =>
    set({
      coverFile: null,
      coverPreview: null,
      open: false,
      coverError: false,
    }),
}));

export default useSelectCoverImageStore;
