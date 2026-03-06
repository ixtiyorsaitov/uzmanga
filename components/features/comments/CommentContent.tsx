"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommentContentProps {
  content: string;
  replyTo?: { user: { name: string } };
  isRepliedComment?: boolean;
}

export default function CommentContent({
  content,
  replyTo,
  isRepliedComment,
}: CommentContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setShowButton(isOverflowing);
    }
  }, [content]);

  return (
    <div className="mb-3 relative group">
      <div
        ref={textRef}
        className={cn(
          "text-sm leading-relaxed text-muted-foreground prose prose-invert prose-sm max-w-none wrap-break-word",
          !isExpanded && "line-clamp-3",
        )}
      >
        {isRepliedComment && replyTo && (
          <span className="text-primary font-semibold mr-1 inline">
            {replyTo.user.name},
          </span>
        )}
        <span
          className="[&>p]:inline [&>p]:m-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-primary cursor-pointer transition-colors mt-1.5 flex items-center gap-1 font-medium"
          type="button"
        >
          {isExpanded ? (
            <>
              Qisqartirish <ChevronUp className="size-3" />
            </>
          ) : (
            <>
              Ko'proq o'qish <ChevronDown className="size-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
