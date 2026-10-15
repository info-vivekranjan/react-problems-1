"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, handleChangeTheme } = useTheme();

  return (
    <>
      <h1>Theme Switcher</h1>
      {theme}

      <button onClick={handleChangeTheme} className="button">
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </>
  );
}
