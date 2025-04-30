import React, { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // ตรวจสอบสถานะ Dark Mode จาก localStorage หากมี
    const storedMode = localStorage.getItem("theme");
    if (storedMode) {
      setDarkMode(storedMode === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      // ตั้งค่า theme ใน localStorage
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    // เพิ่ม/เอาคลาส dark ออกจาก <html> tag
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center">
      <span className="mr-2 text-white">
        {darkMode ? "Dark Mode" : "Light Mode"}
      </span>
      <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="theme-toggle"
            type="checkbox"
            checked={darkMode}
            onChange={toggleTheme}
            className="sr-only"
          />
          <div className="w-10 h-5 bg-gray-300 rounded-full"></div>
          <div
            className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
              darkMode ? "transform translate-x-5" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
}
