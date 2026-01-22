import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { getTheme, type Theme } from "../config/theme";

interface ThemeContextValue {
  theme: Theme;
  themeName: string;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<string>("wow-vanilla");
  const theme = getTheme(themeName);

  const setThemeHandler = (newThemeName: string) => {
    setThemeName(newThemeName);
    // Sauvegarder dans localStorage pour persistance
    localStorage.setItem("theme", newThemeName);
  };

  // Charger le thème sauvegardé au démarrage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setThemeName(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, themeName, setTheme: setThemeHandler }}>
      <div className="themed-app" data-theme={themeName}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
