"use client";

import React from "react";
import { Leaf, Award, Flame, Clock, Heart, Zap, ShieldCheck, ChefHat } from "lucide-react";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: Leaf,
      title: "100% Fresh Ingredients",
      description: "Every pizza uses seasonal produce, never frozen. We partner directly with local farms and artisanal suppliers.",
      accent: "text-emerald-400",
      hoverBorder: "group-hover:border-emerald-400/40",
    },
    {
      icon: ChefHat,
      title: "Signature Recipes",
      description: "Our master pizzaiolos have spent decades perfecting recipes that balance flavors, textures, and visual beauty.",
      accent: "text-brand-gold",
      hoverBorder: "group-hover:border-brand-gold/40",
    },
    {
      icon: Clock,
      title: "30-Min Delivery Promise",
      description: "Hot, fast, and reliable. Our real-time dispatch system guarantees your pizza arrives in perfect condition.",
      accent: "text-brand-brightred",
      hoverBorder: "group-hover:border-brand-red/40",
    },
    {
      icon: ShieldCheck,
      title: "Quality You Can Taste",
      description: "From 72-hour dough fermentation to 500°C stone oven baking — every step is engineered for peak flavor.",
      accent: "text-blue-400",
      hoverBorder: "group-hover:border-blue-400/40",
    },
    {
      icon: Heart,
      title: "Made With Passion",
      description: "We genuinely believe in what we make. Every pizza reflects decades of obsession, learning, and love for the craft.",
      accent: "text-pink-400",
      hoverBorder: "group-hover:border-pink-400/40",
    },
    {
      icon: Zap,
      title: "No Compromise Freshness",
      description: "Zero pre-cooked. Zero artificial flavors. Zero preservatives. Just real food, made fresh for every order.",
      accent: "text-brand-amber",
      hoverBorder: "group-hover:border-brand-amber/40",
    },
  ];


  return (
    <section
      id="why-us"
      className="relative py-28 sm:py-36 bg-gradient-to-b from-brand-black via-brand-dark to-brand-black overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 noise-bg pointer-events-none opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-red/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-extrabold uppercase tracking-[0.25em] mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>OUR PROMISE TO YOU</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            WHY PEOPLE <br />
            <span className="bg-gradient-to-r from-brand-red via-brand-brightred to-brand-amber bg-clip-text text-transparent text-glow">
              LOVE US.
            </span>
          </h2>
        </div>

        {/* 6 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`group relative p-7 rounded-3xl glass-card transition-all duration-300 hover:-translate-y-1 border border-white/8 ${pillar.hoverBorder}`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${pillar.accent}`}>
                  <Icon className={`w-6 h-6 ${pillar.accent}`} />
                </div>
                <h3 className="text-lg font-semibold uppercase tracking-tight text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-brand-cream/60 leading-relaxed">
                  {pillar.description}
                </p>
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-b-3xl ${pillar.accent}`} />
              </div>
            );

          })}
        </div>
      </div>
    </section>
  );
}
