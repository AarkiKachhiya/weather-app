import { useEffect, useState } from "react";

import { Sun, Moon } from "lucide-react";
const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("weather-theme") as
      | "light"
      | "dark"
      | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("weather-theme", newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div
      onClick={toggleTheme}
      className={`fixed top-8 right-4 z-50 w-10 h-10 rounded-full border-2 shadow-md flex items-center justify-center cursor-pointer transition-all duration-300
        ${
          theme === "dark"
            ? "bg-gray-400 border-gray-300 text-black"
            : "bg-white border-gray-400 text-gray-800"
        }
      `}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Moon fontSize="small" /> : <Sun fontSize="small" />}
    </div>
  );
};

export default ThemeToggle;
