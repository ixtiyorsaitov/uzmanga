import { create } from "zustand";
import { OpenStateType } from ".";

const useSidebar = create<OpenStateType>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useSidebar;
