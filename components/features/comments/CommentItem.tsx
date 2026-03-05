"use client";

import React from "react";
import { IComment } from "@/types/comment";
import useCommentStore from "@/store/comment.store";
import CommentCard from "./CommentCard";

interface Props {
  comment: IComment & { children?: Props["comment"][] };
  depth?: number;
}

function CommentItem({ comment, depth = 0 }: Props) {
  const { activeReplyId } = useCommentStore();

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <CommentCard comment={comment} />

      {/* Nested replies */}
      {comment.children && comment.children.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.children.map((child) => (
            <CommentItem key={child._id} comment={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(CommentItem);
