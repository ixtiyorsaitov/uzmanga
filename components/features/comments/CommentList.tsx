import { IComment } from "@/types/comment";
import CommentItem from "./CommentItem";

interface Props {
  comments: (IComment & { children?: any[] })[];
}

export default function CommentList({ comments }: Props) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
}
