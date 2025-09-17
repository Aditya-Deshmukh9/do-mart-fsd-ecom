"use client";
import React, { useState } from "react";
import { Search, User, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { DarkModeToggle } from "./dark-mode-toggle";
import Link from "next/link";
import { HomeNavbar } from "@/modules/constants";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BrandLogo from "./logo";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loction = usePathname();
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/sign-in");
  };
  return (
    <nav className="bg-background shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <BrandLogo />

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {HomeNavbar.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-foreground font-medium hover:text-primary active:text-primary px-3 py-2 ${
                      item.href === loction ? "text-primary" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Search, Social Icons, and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products"
                className="w-64 px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleLoginClick}>
                <User className="w-5 h-5" />
              </Button>
              <DarkModeToggle />
              <Button variant="ghost" className={"relative"}>
                <Heart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </Button>
              <Button variant="ghost">
                <ShoppingCart className="w-5 h-5" />
                <span className="ml-2 text-sm font-medium">0 / ₹0.00</span>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-accent">
            {HomeNavbar.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                active={item.href === loction}
                className="text-purple-600 block px-3 py-2 font-medium"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center justify-around px-3 py-4 border-t border-gray-200">
              <Button variant="ghost" onClick={handleLoginClick}>
                <User className="w-5 h-5" />
              </Button>
              <DarkModeToggle />
              <Button variant="ghost" className={"relative"}>
                <Heart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </Button>
              <Button variant="ghost">
                <ShoppingCart className="w-5 h-5" />
                <span className="ml-2 text-sm font-medium">0 / ₹0.00</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
