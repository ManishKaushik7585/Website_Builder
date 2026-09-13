import React from 'react';
import { Link } from '@/components/ui/Link';

export default function AurelBenchmarkPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans selection:bg-[#333] selection:text-white">
      {/* Minimal Navigation */}
      <nav className="flex items-center justify-between px-8 py-12 max-w-[1440px] mx-auto">
        <div className="text-sm tracking-[0.2em] font-medium uppercase text-white/70 hover:text-white transition-colors duration-500 cursor-pointer">
          AUREL
        </div>
        <div className="flex gap-12 text-xs tracking-widest uppercase text-white/50">
          <Link href="#collection" className="hover:text-white transition-colors duration-500">Collection</Link>
          <Link href="#craftsmanship" className="hover:text-white transition-colors duration-500">Craftsmanship</Link>
          <Link href="#heritage" className="hover:text-white transition-colors duration-500">Heritage</Link>
        </div>
      </nav>

      {/* Hero Section: Centered, minimal, large typography */}
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center max-w-[1200px] mx-auto">
        <h1 className="text-fluid-display tracking-tight font-light leading-[1.1] mb-6">
          Time, Elevated.
        </h1>
        <p className="text-fluid-body-lg text-white/50 max-w-[500px] leading-relaxed mb-16 font-light">
          Aurel manufactures premium mechanical timepieces for those who understand that perfection takes time.
        </p>

        {/* Minimal Luxury Imagery Placeholder */}
        <div className="w-full max-w-[800px] aspect-[16/9] bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] rounded-sm border border-white/5 flex items-center justify-center overflow-hidden group">
          <div className="w-[300px] h-[300px] rounded-full border border-white/10 flex items-center justify-center opacity-50 group-hover:scale-105 transition-transform duration-1000 ease-out">
            <span className="text-white/20 text-xs tracking-[0.3em] uppercase">Chronograph Model 01</span>
          </div>
        </div>
      </main>

      {/* Featured Section: High contrast, elegant spacing */}
      <section className="py-32 px-8 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="text-fluid-heading-xl font-light mb-8">
            The Mastery of Mechanics
          </h2>
          <p className="text-fluid-body text-white/50 leading-relaxed max-w-[400px]">
            Every Aurel timepiece is hand-assembled in Geneva by master watchmakers. We use exclusively in-house calibres, featuring hundreds of precisely machined components that interact in perfect harmony.
          </p>
        </div>
        <div className="aspect-[3/4] bg-[#111] rounded-sm border border-white/5" />
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 py-12 px-8 text-center text-xs tracking-widest uppercase text-white/30">
        &copy; {new Date().getFullYear()} AUREL GENÈVE. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
