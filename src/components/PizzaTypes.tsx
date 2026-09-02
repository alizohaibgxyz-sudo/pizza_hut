"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CRUST_TYPES, CrustType } from "@/data/crusts";
import { formatPrice } from "@/lib/utils";
import { Sparkles, Layers, ShieldCheck, Flame, ChevronRight, Check } from "lucide-react";

export function PizzaTypes() {
  const [activeCrust, setActiveCrust] = useState<CrustType>(CRUST_TYPES[0]);

  return (
    <section
      id="crusts"
      className="relative py-28 sm:py-36 bg-gradient-to-b from-brand-black via-brand-dark to-brand-black overflow-hidden border-t border-white/5"
    >
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-amber/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-extrabold uppercase tracking-[0.25em] mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>CRUST CRAFTSMANSHIP</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            SIGNATURE <br />
            <span className="bg-gradient-to-r from-brand-red via-brand-brightred to-brand-amber bg-clip-text text-transparent text-glow">
              CRUST STYLES.
            </span>
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-brand-cream/70 mt-4 leading-relaxed">
            Every great pizza starts with the foundation. Choose from our four master-crafted crust varieties.
          </p>
        </div>

        {/* Interactive Crust Selector Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Crust Selection Cards */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {CRUST_TYPES.map((crust) => {
              const isSelected = activeCrust.id === crust.id;
              return (
                <div
                  key={crust.id}
                  onClick={() => setActiveCrust(crust)}
                  className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? "bg-brand-surface/90 border-brand-red shadow-[0_10px_30px_rgba(215,25,32,0.3)] scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20"
                  }`}
                  data-cursor="SELECT"
                >
                  {/* Selected Indicator Bar */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-brand-red to-brand-brightred rounded-l-2xl" />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-lg font-black uppercase tracking-tight ${isSelected ? "text-white" : "text-brand-cream/90"}`}>
                          {crust.name}
                        </h3>
                        {crust.extraCost > 0 && (
                          <span className="px-2 py-0.5 rounded-md bg-brand-red/20 text-brand-gold text-[10px] font-bold">
                            +{formatPrice(crust.extraCost)}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-brand-cream/60 mt-0.5">{crust.subtitle}</span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-brand-red text-white "
                          : "bg-white/5 text-brand-cream/40 group-hover:text-white"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Crust Feature Visual & Gauges */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl glass-card border border-white/15 p-6 sm:p-8 overflow-hidden shadow-2xl transition-all duration-500">
              
              {/* Image Showcase */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-6 bg-brand-black">
                <Image
                  src={activeCrust.image}
                  alt={activeCrust.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-brand-red text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    {activeCrust.name}
                  </span>
                  <span className="text-xs font-mono text-brand-gold font-semibold bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                    {activeCrust.thickness}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                {activeCrust.subtitle}
              </h3>
              <p className="text-sm text-brand-cream/80 mt-2 leading-relaxed">
                {activeCrust.description}
              </p>

              {/* Highlight callout */}
              <div className="mt-4 p-3.5 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-xs font-semibold text-brand-cream">
                  {activeCrust.highlight}
                </span>
              </div>

              {/* Crust Sensory Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                {/* Crunch Level Meter */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-brand-cream">
                    <span>CRUNCH FACTOR</span>
                    <span className="text-brand-gold font-mono">{activeCrust.crunchLevel} / 5</span>
                  </div>
                  <div className="flex gap-1.5 h-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          level <= activeCrust.crunchLevel
                            ? "bg-brand-red "
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Cheese Depth Meter */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-brand-cream">
                    <span>CHEESE DEPTH</span>
                    <span className="text-brand-amber font-mono">{activeCrust.cheeseDepth} / 5</span>
                  </div>
                  <div className="flex gap-1.5 h-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          level <= activeCrust.cheeseDepth
                            ? "bg-brand-amber "
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bake Style Info */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 text-xs text-brand-cream/60">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-brand-red" />
                  <span>Baking Method: <strong className="text-white">{activeCrust.bakeStyle}</strong></span>
                </div>
                <a
                  href="#menu"
                  className="text-brand-red hover:text-brand-brightred font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <span>Taste This Crust</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
