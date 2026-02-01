import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@/components/icons";
import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

const HeaderTitle = ({ title, href }: Props) => {
  return (
    <div className="w-full flex items-center justify-between">
      <h2 className="text-[24px] font-semibold">{title}</h2>
      {href && (
        <Button size={"icon"} variant={"outline"} asChild>
          <Link href={href}>
            <ArrowTopRightIcon />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default HeaderTitle;
