import { create } from "zustand";
import { OpenStateType } from "..";

const useAuthModal = create<OpenStateType>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useAuthModal;
