"use client";

import { Fragment } from "react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileWidget from "@/components/features/user/ProfileWidget";
import { Separator } from "@/components/ui/separator";
import SubscribeButton from "@/components/shared/subscribe/SubscribeButton";
import { dropdownItems } from "./data";
import { BookOpenIcon, ChatIcon, SettingsIcon } from "@/components/icons";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LogoutIcon from "@/components/icons/logout.icon";
import { useAuth } from "@/components/contexts/auth.context";
import Link from "next/link";

const UserDropdown = () => {
  const { logout } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return (
    <DropdownMenuContent
      align="end"
      className="group relative w-77.5 max-h-[87vh] overflow-y-auto p-2 space-y-3 rounded-2xl scrollbar-none"
    >
      <div className="p-3 border border-muted rounded-xl">
        <ProfileWidget />
      </div>
      <Separator />
      <SubscribeButton />
      <Separator />
      <DropdownMenuGroup className="mb-0">
        {dropdownItems.map((dropdownItem) => (
          <Fragment key={dropdownItem.label}>
            {dropdownItem.submenu ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="rounded-lg">
                  {dropdownItem.label}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {dropdownItem.submenu.map((subItem) => (
                      <DropdownMenuItem
                        className="justify-between rounded-lg"
                        key={subItem.label}
                        asChild
                      >
                        <Link href={subItem.href!}>
                          {subItem.label}
                          {subItem.icon}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                className="justify-between rounded-lg"
                key={dropdownItem.label}
              >
                {dropdownItem.label}
                {dropdownItem.icon}
              </DropdownMenuItem>
            )}
            {dropdownItem.hr && <Separator className="my-2" />}
          </Fragment>
        ))}
      </DropdownMenuGroup>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            onSelect={(e) => e.preventDefault()}
            className="font-semibold px-2 py-0 hover:no-underline"
          >
            Boshqa
          </AccordionTrigger>
          <AccordionContent className="pl-3 space-y-2 py-2">
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="justify-between font-semibold rounded-lg"
            >
              Sozlamalar
              <SettingsIcon className="size-5" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={toggleTheme}
              onSelect={(e) => e.preventDefault()}
              className="justify-between font-semibold rounded-lg"
            >
              <h1 className="text-md font-semibold">Tungi rejim</h1>
              <Switch
                className="scale-105"
                checked={resolvedTheme === "dark"}
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="justify-between font-semibold rounded-lg"
            >
              Fikr-mulohaza
              <ChatIcon className="size-5" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="justify-between font-semibold rounded-lg"
            >
              {"Qo'llanmani to'ldiring"}
              <BookOpenIcon className="size-5" />
            </DropdownMenuItem>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={logout}
          className="justify-between text-destructive hover:text-destructive! rounded-lg"
        >
          Log out
          <LogoutIcon className="size-5 text-destructive" />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};

export default UserDropdown;
