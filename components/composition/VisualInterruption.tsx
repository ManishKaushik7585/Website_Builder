"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface VisualInterruptionProps {
  children: ReactNode;
  height?: 'vh-50' | 'vh-75' | 'vh-100';
  intensity?: 'high' | 'medium' | 'low';
  className?: string;
}

export function VisualInterruption({ children, height = 'vh-75', intensity = 'high', className = '' }: VisualInterruptionProps) {
  const heightClass = height === 'vh-100' ? 'min-h-screen' : height === 'vh-75' ? 'min-h-[75vh]' : 'min-h-[50vh]';
  const paddingClass = intensity === 'high' ? 'py-32 md:py-48' : 'py-20 md:py-32';

  return (
    <section className={`w-full flex items-center justify-center relative overflow-hidden ${heightClass} ${paddingClass} ${className}`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center"
      >
        {children}
      </motion.div>
    </section>
  );
}
