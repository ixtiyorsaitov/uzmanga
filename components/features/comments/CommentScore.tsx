import { useState } from "react";
import { useReactComment } from "@/components/hooks/api/useComments";
import { Heart, HeartCrack } from "lucide-react";
import { appToast } from "@/lib/app-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const active = "fill-destructive text-destructive";

export default function CommentScore({
  score: defaultScore,
  commentId,
  userReaction,
}: {
  score: number;
  commentId: string;
  userReaction: 1 | -1 | null;
}) {
  const [score, setScore] = useState(defaultScore);
  const [value, setValue] = useState<1 | -1 | null>(userReaction);
  const reactComment = useReactComment();

  const handleReactComment = (value: 1 | -1) => {
    reactComment.mutate(
      { commentId, value },
      {
        onSuccess: (res) => {
          console.log(res);

          setValue(res.data!.userReaction);
          setScore(res.data!.score);
        },
        onError: (error: any) => {
          const message = error.message || "Kutilmagan xatolik yuz berdi";
          appToast.error(message);
        },
      },
    );
  };

  const loading = reactComment.isPending;
  return (
    <div className="ml-auto flex items-center ">
      <Button
        disabled={loading}
        type="button"
        variant={"ghost"}
        className={cn(
          "flex items-center gap-1.5 transition-colors hover:bg-accent",
        )}
        onClick={() => handleReactComment(1)}
      >
        <Heart className={cn("size-4", value === 1 && active)} />
        <span>{score}</span>
      </Button>
      <Button
        disabled={loading}
        type="button"
        variant={"ghost"}
        className={cn(
          "transition-colors hover:bg-accent",
          value === -1 ? active : "hover:text-foreground",
        )}
        size={"icon"}
        onClick={() => handleReactComment(-1)}
      >
        <HeartCrack className={cn("size-4", value === -1 && active)} />
      </Button>
    </div>
  );
}
