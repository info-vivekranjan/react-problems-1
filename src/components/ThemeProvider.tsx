"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<{
  theme: string | null;
  handleChangeTheme: () => void;
} | null>(null);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    let themeData = localStorage.getItem("theme") ?? "light";

    if (!themeData) {
      return "light";
    }
    return themeData;
  });

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme ?? "light");
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
