import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChapterStore {
  visiblePanels: boolean;
  setVisiblePanels: (open: boolean) => void;

  settingsSheetOpen: boolean;
  chaptersSheetOpen: boolean;
  commentsSheetOpen: boolean;
  setSettingsSheetOpen: (open: boolean) => void;
  setChaptersSheetOpen: (open: boolean) => void;
  setCommentsSheetOpen: (open: boolean) => void;

  brightness: number;
  setBrightness: (val: number) => void;
  containerWidth: number;
  setContainerWidth: (val: number) => void;
  imageGap: number;
  setImageGap: (val: number) => void;
  readingMode: "vertical" | "horizontal";
  setReadingMode: (mode: "vertical" | "horizontal") => void;

  // Sahifani kuzatish uchun
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const useChapterStore = create<ChapterStore>()(
  persist(
    (set) => ({
      visiblePanels: true,
      setVisiblePanels: (open) => set({ visiblePanels: open }),

      settingsSheetOpen: false,
      chaptersSheetOpen: false,
      commentsSheetOpen: false,
      setSettingsSheetOpen: (open) => set({ settingsSheetOpen: open }),
      setChaptersSheetOpen: (open) => set({ chaptersSheetOpen: open }),
      setCommentsSheetOpen: (open) => set({ commentsSheetOpen: open }),

      brightness: 100,
      setBrightness: (val) => set({ brightness: val }),

      containerWidth: 100,
      setContainerWidth: (val) => set({ containerWidth: val }),

      imageGap: 0,
      setImageGap: (val) => set({ imageGap: val }),

      readingMode: "vertical",
      setReadingMode: (mode) => set({ readingMode: mode }),

      currentPage: 0, // 0-indeksdan boshlanadi
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: "manga-settings", // LocalStorage'dagi nomi
      // Faqat shu qiymatlarni saqlaymiz (panellar yoki joriy sahifa saqlanmaydi)
      partialize: (state) => ({
        brightness: state.brightness,
        containerWidth: state.containerWidth,
        imageGap: state.imageGap,
        readingMode: state.readingMode,
      }),
    },
  ),
);
