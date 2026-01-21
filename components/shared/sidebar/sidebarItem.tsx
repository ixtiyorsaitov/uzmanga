import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonStyle, MenuItem } from "./data";
import { Badge } from "@/components/ui/badge";

const SidebarItem = ({ item }: { item: MenuItem }) => {
  return (
    <div className="w-full flex items-center justify-start gap-2">
      <Link
        className={cn(buttonVariants({ variant: "ghost" }), buttonStyle)}
        href={item.href ?? "#"}
      >
        {item.icon ? item.icon : "• "}
        {item.label}
      </Link>
      {item.isNew && <Badge>Yangi</Badge>}
    </div>
  );
};

export default SidebarItem;
