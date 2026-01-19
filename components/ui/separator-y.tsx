import { cn } from "@/lib/utils";
import React from "react";

const SeparatorY = ({ className }: { className?: string }) => {
  return (
    <div className={cn("bg-secondary h-8 w-px rounded-full", className)} />
  );
};

export default SeparatorY;
