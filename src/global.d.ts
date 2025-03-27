/// <reference types="react" />
/// <reference types="react-dom" />

// Permite propriedades CSS personalizadas
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

// Declarações de módulos que estão causando erros
declare module 'recharts'
declare module 'cmdk'
declare module 'vaul'
declare module 'react-day-picker'
declare module 'react-resizable-panels'
declare module 'embla-carousel-react'
declare module 'input-otp'
declare module 'next-themes' {
  export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: string;
    enableSystem?: boolean;
    storageKey?: string;
    themes?: string[];
    disableTransitionOnChange?: boolean;
  }
  
  export function ThemeProvider(props: ThemeProviderProps): JSX.Element;
  
  export function useTheme(): {
    theme: string;
    setTheme: (theme: string) => void;
    resolvedTheme: string;
    themes: string[];
    systemTheme: string;
  };
}

// Declara tipos para ImportMeta
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Add any other modules that might be missing types 