import React, { createContext, useContext, useEffect, useState } from "react";

// Tipos de tema permitidos
type Theme = "dark" | "light" | "system";

// Interface para as props do ThemeProvider
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Interface para o contexto do tema
interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Theme;
  systemTheme: Theme;
  themes: Theme[];
}

// Estado inicial do contexto
const initialState: ThemeContextProps = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "system",
  systemTheme: "system",
  themes: ["light", "dark", "system"],
};

// Criação do contexto
const ThemeContext = createContext<ThemeContextProps>(initialState);

// Hook para usar o tema
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
}

// Componente ThemeProvider
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  // Estado para o tema atual
  const [theme, setTheme] = useState<Theme>(() => {
    // Tenta recuperar o tema do localStorage
    const storedTheme = localStorage.getItem(storageKey);
    return (storedTheme as Theme) || defaultTheme;
  });

  // Estado para o tema do sistema
  const [systemTheme, setSystemTheme] = useState<Theme>("light");

  // Obtém o tema resolvido (tema atual ou tema do sistema se o tema for "system")
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  // Detecta o tema do sistema e atualiza quando muda
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };
    
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Aplica a classe do tema ao elemento html
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove as classes de tema antigas
    root.classList.remove("light", "dark");
    
    // Adiciona a classe do tema resolvido
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  // Função para alterar o tema
  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
  };

  // Valor do contexto
  const value = {
    theme,
    setTheme: handleSetTheme,
    resolvedTheme,
    systemTheme,
    themes: ["light", "dark", "system"],
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 