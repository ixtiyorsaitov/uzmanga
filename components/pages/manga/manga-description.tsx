"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function MangaDescription({ htmlContent }: { htmlContent: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative blur-card p-4 transition-all duration-300">
      <div
        className={cn(
          "leading-relaxed prose prose-invert max-w-none text-sm",
          !isExpanded && "line-clamp-3 pr-8",
        )}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

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
