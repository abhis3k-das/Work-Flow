"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggle({iconSize} : {iconSize : string}) {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      onClick={handleToggle}
      className="cursor-pointer rounded-full transition-all duration-300 active:scale-95"
    >
      {theme === "dark" ? <MoonIcon className={iconSize} /> : <SunIcon className={iconSize} />}
    </div>
  );
}
