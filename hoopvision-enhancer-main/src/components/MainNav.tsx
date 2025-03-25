"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Basketball } from 'lucide-react';

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Basketball
  },
  {
    title: "Jogos",
    href: "/matches",
    icon: Basketball
  },
  {
    title: "Jogadores",
    href: "/players",
    icon: Basketball
  },
  {
    title: "Times",
    href: "/teams",
    icon: Basketball
  }
];

export function MainNav() {
  const location = useLocation();

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          HoopVision
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <Link to={item.href} className={cn(
                navigationMenuTriggerStyle(),
                "flex items-center gap-1",
                location.pathname === item.href &&
                  "bg-accent text-accent-foreground font-medium"
              )}>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
} 