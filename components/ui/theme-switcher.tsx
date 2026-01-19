"use client";

import { Button } from "./button";
import { useTheme } from "next-themes";
import MoonIcon from "@/components/icons/moon.icon";
import SunIcon from "@/components/icons/sun.icon";

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="secondary" size={"icon"} onClick={toggleTheme}>
      {resolvedTheme === "dark" ? (
        <MoonIcon className="size-5" />
      ) : (
        <SunIcon className="size-5" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
