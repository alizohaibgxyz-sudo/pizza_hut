"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/data/testimonials";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    startX.current = e.clientX;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    }
  };

  const t = TESTIMONIALS[active];

  return (
    <section
      id="testimonials"
      className="relative py-28 sm:py-36 bg-brand-black overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(215,25,32,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-extrabold uppercase tracking-[0.25em] mb-4">
            <Star className="w-3.5 h-3.5 fill-brand-red" />
            <span>WHAT OUR GUESTS SAY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            REAL REVIEWS FROM <br />
            <span className="bg-gradient-to-r from-brand-red to-brand-amber bg-clip-text text-transparent text-glow">
              REAL PIZZA LOVERS.
            </span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div
          className="relative rounded-3xl glass-card border border-white/15 p-8 sm:p-12 cursor-grab active:cursor-grabbing select-none shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {/* Background Quote Icon */}
          <Quote className="absolute top-6 right-8 w-24 h-24 text-brand-red/10" />

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-brand-red/40 ">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="text-center">
                <div className="font-extrabold text-white text-sm">{t.name}</div>
                <div className="text-[11px] text-brand-cream/50">{t.role}</div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-brand-gold text-brand-gold" : "text-white/20"}`} />
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="flex flex-col gap-4">
              <p className="text-lg sm:text-xl font-medium text-brand-cream/90 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="text-xs text-brand-cream/50 flex items-center gap-3">
                <span>{t.date}</span>
                <span className="w-1 h-1 bg-brand-cream/30 rounded-full" />
                <span className="text-brand-gold font-semibold">Favorite: {t.favoritePizza}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full bg-white/5 hover:bg-brand-red border border-white/10 hover:border-brand-red text-white flex items-center justify-center transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === active ? "w-8 h-2 bg-brand-red" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-11 h-11 rounded-full bg-white/5 hover:bg-brand-red border border-white/10 hover:border-brand-red text-white flex items-center justify-center transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
