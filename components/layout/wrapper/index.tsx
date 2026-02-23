import { cn } from "@/lib/utils";

type Size = "lg" | "xl" | "2xl";
const defineMaxWidth = (size: Size) => {
  switch (size) {
    case "lg":
      return 1024;
    case "xl":
      return 1280;
    case "2xl":
      return 1536;
  }
};

interface Props {
  size?: Size;
  children: React.ReactNode;
  className?: string;
  disableSize?: boolean;
  noPadding?: boolean;
  contentClassName?: string;
}
const Wrapper = ({
  size = "xl",
  children,
  className,
  contentClassName,
  disableSize,
  noPadding,
}: Props) => {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-center",
        !noPadding && "px-4",
        className,
      )}
    >
      <div
        className={cn("w-full", contentClassName)}
        style={{ maxWidth: disableSize ? "100%" : defineMaxWidth(size) + "px" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
