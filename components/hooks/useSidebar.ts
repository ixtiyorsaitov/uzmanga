import { create } from "zustand";

type Store = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const useSidebar = create<Store>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useSidebar;
