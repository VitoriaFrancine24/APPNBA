import React from 'react';

export interface ToastProps {
  variant?: 'default' | 'destructive';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type ToastActionElement = React.ReactElement;

export function Toast({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background border rounded-md shadow-md p-4 mb-2">
      {children}
    </div>
  );
}

export function ToastTitle({ children }: { children: React.ReactNode }) {
  return <div className="font-semibold">{children}</div>;
}

export function ToastDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-muted-foreground">{children}</div>;
}

export function ToastClose() {
  return (
    <button className="absolute top-2 right-2 text-muted-foreground">×</button>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function ToastViewport() {
  return null;
}
