"use client";

import React, { useContext, useEffect, useState, createContext } from "react";

const themeContext = createContext();

const Theme = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");

    if (localTheme) {
      setMode(localTheme);
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);

  }, [mode]);

  return (
    <themeContext.Provider value={{ mode, setMode }}>
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => useContext(themeContext);

const ThemeProvider = ({ children }) => {
  return <Theme>{children}</Theme>;
};

export default ThemeProvider;
