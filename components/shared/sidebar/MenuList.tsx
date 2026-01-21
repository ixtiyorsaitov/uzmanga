import React, { Fragment, memo } from "react";
import menuItems, {
  buttonStyle,
  defineSeperatorClassnameByHrType,
} from "./data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import SidebarItem from "./sidebarItem";
import { Separator } from "@/components/ui/separator";
import SubscribeButton from "@/components/shared/subscribe/SubscribeButton";

const MenuList = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return menuItems.map((item) => (
    <Fragment key={item.label}>
      {item.submenu ? (
        <div
          className={
            item.onlyAuth && !isAuthenticated
              ? "hidden"
              : "block w-full space-y-2"
          }
        >
          <Collapsible className="w-full">
            <CollapsibleTrigger asChild>
              <div className="w-full flex items-center justify-between gap-2">
                <Button variant={"ghost"} className={buttonStyle}>
                  {item.icon}
                  {item.label}
                </Button>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="hover:bg-transparent"
                >
                  <ChevronDown />
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              {item.submenu.map((subItem) => (
                <SidebarItem key={subItem.label} item={subItem} />
              ))}
            </CollapsibleContent>
          </Collapsible>
          {item.hr !== undefined && (
            <Separator
              className={defineSeperatorClassnameByHrType(
                item.hr,
                isAuthenticated,
              )}
            />
          )}
        </div>
      ) : (
        <div
          className={
            item.onlyAuth && !isAuthenticated
              ? "hidden"
              : "block w-full space-y-2"
          }
        >
          <SidebarItem item={item} />
          {item.hr && <Separator />}
          {item.premiumBtn && isAuthenticated && (
            <>
              <Separator />
              <SubscribeButton />
            </>
          )}
        </div>
      )}
    </Fragment>
  ));
};

export default memo(MenuList);
