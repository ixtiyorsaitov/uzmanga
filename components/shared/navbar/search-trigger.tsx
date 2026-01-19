import SearchIcon from "@/components/icons/search.icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SearchTrigger = ({ className }: { className?: string }) => {
  return (
    <Button
      variant={"secondary"}
      className={cn("px-5 text-muted-foreground pr-12!", className)}
    >
      <SearchIcon />
      Nimani qidiryapmiz, sempay?
    </Button>
  );
};
export default SearchTrigger;
