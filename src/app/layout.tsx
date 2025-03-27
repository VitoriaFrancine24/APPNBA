import "@/styles/globals.css";
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="hoopvision-theme">
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </ThemeProvider>
  );
} 