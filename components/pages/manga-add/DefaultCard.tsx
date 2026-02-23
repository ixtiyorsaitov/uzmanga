import { cn } from "@/lib/utils";
import React from "react";

type DefaultCardProps = React.ComponentProps<"div">;

export default function DefaultCard({
  children,
  className,
  ...props
}: DefaultCardProps) {
  return (
    <div
      className={cn("w-full border rounded-xl relative", className)}
      {...props}
    >
      {children}
    </div>
  );
}
