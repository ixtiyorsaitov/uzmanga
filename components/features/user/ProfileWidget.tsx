import CoinIcon from "@/components/icons/coin.icon";
import ExchangeIcon from "@/components/icons/exchange.icon";
import FlashIcon from "@/components/icons/flash.icon";
import TicketIcon from "@/components/icons/ticket.icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  isDropdownMode?: boolean;
}

const ProfileWidget = ({ isDropdownMode = false }: Props) => {
  return (
    <div className="space-y-4">
      <Link href={"#"} className="w-full flex items-center justify-start gap-4">
        <Avatar className="size-10.5 rounded-md">
          <AvatarFallback>I</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="hover:underline">Ixtiyor Saitov</h1>
          <p className="text-xs text-muted-foreground">ID: 1234567</p>
        </div>
      </Link>
      <Separator />
      <Link
        href={"#"}
        className={cn(
          "w-full flex items-center justify-between",
          isDropdownMode && "hover:bg-accent p-2 rounded-md",
        )}
      >
        <div className="flex items-center justify-start gap-2">
          <CoinIcon />
          <p className="text-xs font-semibold">0 tanga</p>
        </div>
        <Button className="text-xs" size={"sm"}>
          {"Hisobni to'ldirish"}
        </Button>
      </Link>
      <div className="flex items-center justify-between w-full">
        <div className="bg-muted flex h-7 w-max gap-4 rounded-full px-4">
          <div className="flex items-center justify-center gap-2">
            <TicketIcon />
            <p className="text-xs">0</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FlashIcon />
            <p className="text-xs">49</p>
          </div>
        </div>
        <Button variant={"secondary"} className="px-4! h-7! bg-muted!">
          <ExchangeIcon className="w-5! h-5!" />
        </Button>
      </div>
    </div>
  );
};

export default ProfileWidget;
