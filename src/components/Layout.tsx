import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import MainNav from './MainNav';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container flex-1">
        <MainNav />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout; 