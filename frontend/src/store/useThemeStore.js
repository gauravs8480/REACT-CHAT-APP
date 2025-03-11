import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "light",
  setTheme: (theme) => {
    console.log("Setting theme to:", theme); // Debug
    localStorage.setItem("chat-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    set({ theme });
  },
}));

// Sync initial theme
const savedTheme = localStorage.getItem("chat-theme") || "light";
console.log("Initial theme:", savedTheme);
document.documentElement.setAttribute("data-theme", savedTheme);