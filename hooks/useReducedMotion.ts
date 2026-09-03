"use client";
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function useReducedMotion() {
  const subscribe = (callback: () => void) => {
    if (typeof window === 'undefined') return emptySubscribe();
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
  };

  const getSnapshot = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
