import { useState, useCallback } from "react";

const useDarkMode = () => {
  // If darkMode on local storage is undefined, set dark mode by default
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(window.localStorage.getItem("darkMode")) ?? true
  );

  const toggleMode = useCallback(() => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  }, [darkMode]);

  return [darkMode, toggleMode];
};

export default useDarkMode;
