"use client";

import * as React from "react";
import { Link, useLocation } from 'react-router-dom'
import { Home, Users, Trophy, Calendar } from 'lucide-react'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/matches", label: "Jogos" },
  { href: "/players", label: "Jogadores" },
  { href: "/teams", label: "Times" },
];

export function MobileNavigation() {
  const location = useLocation()

  const items = [
    {
      label: 'Início',
      href: '/',
      icon: Home,
    },
    {
      label: 'Jogos',
      href: '/matches',
      icon: Calendar,
    },
    {
      label: 'Times',
      href: '/teams',
      icon: Trophy,
    },
    {
      label: 'Jogadores',
      href: '/players',
      icon: Users,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background md:hidden">
      <div className="grid h-full grid-cols-4">
        {items.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center text-xs',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

interface MobileLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  href: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const handleClick = () => {
    onOpenChange?.(false);
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
} 