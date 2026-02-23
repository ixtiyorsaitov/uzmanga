import { create } from "zustand";

interface CoverImageState {
  open: boolean;
  coverFile: File | null;
  coverPreview: string | null;
  setOpen: (open: boolean) => void;
  setCover: (file: File) => void;
  removeCover: () => void;
}

const useSelectCoverImageStore = create<CoverImageState>((set) => ({
  open: false,
  coverFile: null,
  coverPreview: null,
  setOpen: (open) => set({ open }),
  setCover: (file: File) =>
    set({
      coverFile: file,
      coverPreview: URL.createObjectURL(file),
    }),
  removeCover: () =>
    set({
      coverFile: null,
      coverPreview: null,
      open: false,
    }),
}));

export default useSelectCoverImageStore;
