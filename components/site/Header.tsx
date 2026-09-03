"use client";
import React, { useState, ReactNode } from 'react';
import { NavigationItem } from '@/config/navigation';
import { cn } from '@/utils/cn';

export interface HeaderProps {
  brand: ReactNode;
  navigation: NavigationItem[];
  actions?: ReactNode;
}

export function Header({ brand, navigation, actions }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            {brand}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" aria-label="Desktop Navigation">
            {navigation.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                className="text-gray-600 hover:text-black font-medium transition-colors"
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Actions / Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {actions}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")} 
        id="mobile-menu"
      >
        <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200" aria-label="Mobile Navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.label}
            </a>
          ))}
          {actions && <div className="px-3 py-2 mt-4">{actions}</div>}
        </nav>
      </div>
    </header>
  );
}
