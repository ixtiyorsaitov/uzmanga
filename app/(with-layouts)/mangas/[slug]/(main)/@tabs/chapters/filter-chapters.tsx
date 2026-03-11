"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDownUpIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const FilterChapters = ({ ordering, search }: { ordering: "index" | "-index", search: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(search);

  const updateQueryParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== search) {
        updateQueryParams("search", searchValue);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const toggleOrdering = () => {
    const newOrder = ordering === "index" ? "-index" : "index";
    updateQueryParams("ordering", newOrder);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <Input
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Qidirish"
        className="blur-card! bg-background/50! backdrop-blur-sm h-10! rounded-full px-5!"
      />

      <Button
        onClick={toggleOrdering}
        variant={"ghost"}
        className="blur-card px-4! h-10! flex items-center gap-2"
      >
        {ordering === "index" ? "Boshidan" : "Oxiridan"}
        <ArrowDownUpIcon
          className={cn(
            "size-4 transition-transform duration-300",
            ordering === "-index" ? "rotate-180" : "rotate-0",
          )}
        />
      </Button>
    </div>
  );
};

export default FilterChapters;
