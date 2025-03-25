import { Basketball } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Basketball className="h-6 w-6" />
          <span className="font-bold">HoopVision</span>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;