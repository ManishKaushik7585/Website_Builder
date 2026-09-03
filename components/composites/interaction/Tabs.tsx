"use client";
import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Box } from '../../layout/Box';

interface TabsContextType {
  selectedTab: string;
  setSelectedTab: (val: string) => void;
  tabs: string[];
  registerTab: (val: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export const Tabs = ({ defaultValue, children }: { defaultValue: string; children: ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState(defaultValue);
  const [tabs, setTabs] = useState<string[]>([]);
  
  const registerTab = (val: string) => {
    if (!tabs.includes(val)) setTabs(prev => [...prev, val]);
  };

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab, tabs, registerTab }}>
      <Box className="w-full">{children}</Box>
    </TabsContext.Provider>
  );
};

export const TabList = ({ children, ariaLabel }: { children: ReactNode; ariaLabel: string }) => {
  const { tabs, setSelectedTab, selectedTab } = useContext(TabsContext)!;
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const idx = tabs.indexOf(selectedTab);
      let nextIdx = idx;
      if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
      if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
      const nextTab = tabs[nextIdx];
      setSelectedTab(nextTab);
      const button = listRef.current?.querySelector(`[id="tab-${nextTab}"]`) as HTMLButtonElement;
      button?.focus();
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className="flex border-b border-gray-200 mb-4"
    >
      {children}
    </div>
  );
};

export const Tab = ({ value, children }: { value: string; children: ReactNode }) => {
  const { selectedTab, setSelectedTab, registerTab } = useContext(TabsContext)!;
  const isSelected = selectedTab === value;
  
  // Register tab on mount
  React.useEffect(() => registerTab(value), [value, registerTab]);

  return (
    <button
      role="tab"
      id={`tab-${value}`}
      aria-selected={isSelected}
      aria-controls={`panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => setSelectedTab(value)}
      className={cn(
        "px-4 py-2 font-medium text-sm transition-colors border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        isSelected ? "border-[var(--color-text-secondary)] text-[var(--color-text-primary)]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      )}
    >
      {children}
    </button>
  );
};

export const TabPanel = ({ value, children }: { value: string; children: ReactNode }) => {
  const { selectedTab } = useContext(TabsContext)!;
  if (selectedTab !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
    >
      {children}
    </div>
  );
};
