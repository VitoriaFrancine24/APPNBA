import React from 'react';
import { Link } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';
import { Basketball } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <Basketball className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              HoopVision
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;