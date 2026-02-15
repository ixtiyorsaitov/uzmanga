"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function MangaDescription({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative blur-card p-4">
      <p className={cn("leading-relaxed", !isExpanded && "line-clamp-3 pr-8")}>
        {text}
      </p>

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="rounded-full size-6 absolute right-2 bottom-2"
        size="icon"
        variant="secondary"
      >
        {isExpanded ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </Button>
    </div>
  );
}
