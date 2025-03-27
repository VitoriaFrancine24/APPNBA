"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
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
    <div className="hidden md:flex md:flex-col md:w-64 md:border-r">
      <Link to="/" className="flex items-center space-x-2 py-4 px-6">
        <span className="font-bold">HoopVision</span>
      </Link>
      <nav className="flex flex-col">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            to={item.href} 
            className={cn(
              "flex items-center gap-2 py-3 px-6 hover:bg-accent",
              location.pathname === item.href && "bg-accent text-accent-foreground font-medium"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
} 