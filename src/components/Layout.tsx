import React from 'react';
import Header from './Header';
import { MainNav } from './MainNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <MainNav />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout; 