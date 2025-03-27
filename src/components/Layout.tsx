import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { MainNav } from './MainNav';
import { ThemeProvider } from './theme-provider';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="hoopvision-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <MainNav />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Layout; 