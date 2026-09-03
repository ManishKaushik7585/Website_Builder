import React, { ReactNode } from 'react';
import { NavigationItem } from '@/config/navigation';

export interface FooterProps {
  brand: ReactNode;
  columns: { title: string; links: NavigationItem[] }[];
  copyright?: ReactNode;
}

export function Footer({ brand, columns, copyright }: FooterProps) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          {brand}
        </div>
        {columns.map(col => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">{col.title}</h3>
            <ul className="mt-4 space-y-4">
              {col.links.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-base text-gray-500 hover:text-gray-900">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {copyright && (
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-400 xl:text-center">
            {copyright}
          </p>
        </div>
      )}
    </footer>
  );
}
