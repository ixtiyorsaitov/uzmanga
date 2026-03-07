"use client";

import useCommentStore from "@/store/comment.store";
import { useDeleteComment } from "@/components/hooks/api/useComments";
import { useQueryClient } from "@tanstack/react-query";
import { appToast } from "@/lib/app-toast";
import { Button } from "@/components/ui/button"; // shadcn ui button
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

// Agar shadcn/ui Dialog (Modal) ishlatsangiz, uni shu yerga o'raysiz
export default function DeleteCommentModal({ targetId }: { targetId: string }) {
  const queryClient = useQueryClient();
  const { commentToDelete, setCommentToDelete } = useCommentStore();
  const deleteComment = useDeleteComment();

  if (!commentToDelete) return null;

  const handleDelete = () => {
    deleteComment.mutate(commentToDelete.id, {
      onSuccess: (res) => {
        appToast.info(res.message);

        queryClient.invalidateQueries({ queryKey: ["comments", targetId] });

        if (commentToDelete.parentId) {
          queryClient.invalidateQueries({
            queryKey: ["replied-comments", commentToDelete.parentId],
          });
        }

        setCommentToDelete(null);
      },
      onError: (error: any) => {
        appToast.error(error.message || "Xatolik yuz berdi");
        setCommentToDelete(null);
      },
    });
  };

  return (
    <AlertDialog
      open={!!commentToDelete}
      onOpenChange={() => setCommentToDelete(null)}
    >
      <AlertDialogContent>
        <h3 className="text-lg font-bold mb-2">Izohni o'chirish</h3>
        <p className="text-muted-foreground mb-6">
          Haqiqatan ham bu izohni o'chirib tashlamoqchimisiz? Bu amalni ortga
          qaytarib bo'lmaydi.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setCommentToDelete(null)}
            disabled={deleteComment.isPending}
          >
            Bekor qilish
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteComment.isPending}
          >
            O'chirish
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
