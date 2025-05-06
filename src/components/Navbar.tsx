
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, User, LogOut, Home, Building, BarChart3 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore Properties", href: "/explore", icon: Building },
    { name: "My Portfolio", href: "/portfolio", icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10 top-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center"
              onClick={closeMenu}
            >
              <span className="text-xl font-bold text-real-600">PropFolio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            <div className="flex space-x-4 items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive(item.href)
                      ? "text-real-600 border-b-2 border-real-500"
                      : "text-gray-500 hover:text-real-600 hover:border-b-2 hover:border-real-300"
                  }`}
                >
                  <item.icon className="mr-1 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-real-100">
                      <User className="h-5 w-5 text-real-600" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="w-[200px] truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-real-600 focus:outline-none"
              aria-expanded="false"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-lg`}
      >
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive(item.href)
                  ? "bg-real-50 text-real-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-real-600"
              } block pl-3 pr-4 py-2 text-base font-medium flex items-center`}
              onClick={closeMenu}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="space-y-1">
              <div className="flex items-center px-4 py-2">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-real-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-real-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 flex items-center"
              >
                <LogOut className="mr-2 h-5 w-5" /> Log out
              </button>
            </div>
          ) : (
            <div className="space-y-1 px-4 py-2">
              <Link
                to="/login"
                className="block text-center py-2 px-4 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-real-600 bg-white hover:bg-gray-50 border-real-300"
                onClick={closeMenu}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block text-center py-2 px-4 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-real-600 hover:bg-real-700"
                onClick={closeMenu}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
