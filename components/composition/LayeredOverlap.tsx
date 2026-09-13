"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LayeredOverlapProps {
  primary: ReactNode;
  secondary: ReactNode;
  overlapDirection?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function LayeredOverlap({ primary, secondary, overlapDirection = 'up', className = '' }: LayeredOverlapProps) {
  const overlapClass = overlapDirection === 'up' ? '-mt-16 md:-mt-32' : 
                       overlapDirection === 'down' ? '-mb-16 md:-mb-32' : 
                       overlapDirection === 'left' ? '-ml-16 md:-ml-32' : 
                       '-mr-16 md:-mr-32';

  return (
    <div className={`relative w-full flex flex-col items-center justify-center ${className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl relative z-0"
      >
        {primary}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className={`w-[90%] md:w-3/4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-12 relative z-10 ${overlapClass}`}
      >
        {secondary}
      </motion.div>
    </div>
  );
}
