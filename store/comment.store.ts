import { create } from "zustand";

interface CommentState {
  mainEditorOpen: boolean;
  setMainEditorOpen: (open: boolean) => void;
  activeReplyId: string | null;
  setActiveReplyId: (id: string | null, user?: string) => void;
  replyingToCommentId: string | null;
}

const useCommentStore = create<CommentState>((set) => ({
  mainEditorOpen: false,
  setMainEditorOpen: (mainEditorOpen) => set({ mainEditorOpen }),
  activeReplyId: null,
  setActiveReplyId: (parentId, commentId) =>
    set({
      activeReplyId: parentId,
      replyingToCommentId: commentId || null,
    }),
  replyingToCommentId: null,
}));

export default useCommentStore;
