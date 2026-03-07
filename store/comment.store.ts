import { create } from "zustand";

interface CommentState {
  mainEditorOpen: boolean;
  setMainEditorOpen: (open: boolean) => void;
  activeReplyId: string | null;
  setActiveReplyId: (id: string | null, user?: string) => void;
  replyingToCommentId: string | null;
  commentToDelete: { id: string; parentId?: string | null } | null;
  setCommentToDelete: (id: string | null, parentId?: string | null) => void;
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
  commentToDelete: null,
  setCommentToDelete: (id, parentId) =>
    set({
      commentToDelete: id ? { id, parentId } : null,
    }),
}));

export default useCommentStore;
