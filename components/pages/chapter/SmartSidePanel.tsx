import { cn } from "@/lib/utils";
import React from "react";

interface SmartSidePanelProps {
  isVisible: boolean;
}

export default function SmartSidePanel({ isVisible }: SmartSidePanelProps) {
  return (
    <aside
      className={cn(
        "fixed right-6 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ease-in-out hidden lg:block",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0",
      )}
    >
      <div className="w-12 h-64 blur-card border rounded-full flex flex-col items-center justify-center gap-6 shadow-xl bg-secondary/20">
        {/* Kelajakdagi tugmalar uchun joy */}
        <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse" />
        <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse" />
        <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse" />
      </div>
    </aside>
  );
}
