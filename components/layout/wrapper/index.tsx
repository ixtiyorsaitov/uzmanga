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
}
const Wrapper = ({ size = "xl", children, className }: Props) => {
  return (
    <div className={cn("w-full flex items-center justify-center px-4", className)}>
      <div className="w-full" style={{ maxWidth: defineMaxWidth(size) + "px" }}>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
