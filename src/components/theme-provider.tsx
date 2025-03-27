import React, { createContext, useContext, useEffect, useState } from "react";

// Tipos de tema permitidos
type Theme = "light" | "dark" | "system";

// Interface para as props do ThemeProvider
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Interface para o contexto do tema
interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Criação do contexto
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Hook para usar o tema
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Componente ThemeProvider
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  // Estado para o tema atual
  const [theme, setTheme] = useState<Theme>(() => {
    // Tenta recuperar o tema do localStorage
    const storedTheme = localStorage.getItem(storageKey);
    return (storedTheme as Theme) || defaultTheme;
  });

  // Aplica a classe do tema ao elemento html
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove as classes de tema antigas
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Função para alterar o tema
  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
  };

  // Valor do contexto
  const value = {
    theme,
    setTheme: handleSetTheme,
  };

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  );
} 