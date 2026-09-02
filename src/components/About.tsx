"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, Award, ShieldCheck, Flame, HeartHandshake } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";

export function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState({ years: 0, pizzas: 0, fresh: 0, oven: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = sectionRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 75%",
      onEnter: () => {
        if (!hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const startTime = performance.now();

          const animateNumbers = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out

            setCounts({
              years: Math.floor(ease * 25),
              pizzas: Math.floor(ease * 50),
              fresh: Math.floor(ease * 100),
              oven: Math.floor(ease * 500),
            });

            if (progress < 1) {
              requestAnimationFrame(animateNumbers);
            }
          };

          requestAnimationFrame(animateNumbers);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [hasAnimated]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-gradient-to-b from-brand-black via-brand-dark to-brand-black overflow-hidden border-t border-white/5"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-brand-amber/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-extrabold uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR LEGACY &amp; PHILOSOPHY</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            MORE THAN <br />
            <span className="bg-gradient-to-r from-brand-red via-brand-brightred to-brand-amber bg-clip-text text-transparent text-glow">
              JUST PIZZA.
            </span>
          </h2>
          <div className="w-20 h-1 bg-brand-red rounded-full mt-4" />
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Editorial Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=80"
                  alt="Artisanal Pizza Dough Stretching"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-dark border border-white/15">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center text-white  flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">72-Hour Cold Fermentation</h4>
                    <p className="text-brand-cream/70 text-xs mt-0.5">
                      Slow naturally levained dough creates maximum lightness and rich honeycomb crust.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Card */}
            <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-brand-surface border border-white/10 shadow-2xl backdrop-blur-md animate-float">
              <Flame className="w-8 h-8 text-brand-amber" />
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-gold">
                  Beechwood Stone Hearth
                </span>
                <p className="text-[11px] text-brand-cream/60">Baked at 500°C High Fire</p>
              </div>
            </div>
          </div>

          {/* Right: Narrative Story & Statistics */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                Born From Obsession. <br />
                <span className="text-brand-red">Perfected For The Craving.</span>
              </h3>
              <p className="text-brand-cream/80 text-base leading-relaxed">
                For over two decades, we have pushed the boundaries of what pizza can be. 
                We believe that great pizza is a sensory ritual — the intoxicating aroma of sizzling herbs, 
                the deafening crunch of a golden crust, and the unstoppable satisfaction of a molten cheese pull.
              </p>
              <p className="text-brand-cream/70 text-sm leading-relaxed">
                Every pie begins with unbleached heritage flour, vine-ripened San Marzano tomatoes picked at the peak of sweetness, 
                and fresh whole-milk mozzarella sourced directly from family farms. No shortcuts. Just pure fire, passion, and uncompromising flavor.
              </p>
            </div>

            {/* Quality Pillars Icons */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-brand-red flex-shrink-0" />
                <span className="text-xs font-bold text-brand-cream">100% Real Dairy Cheese</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <HeartHandshake className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-xs font-bold text-brand-cream">Locally Sourced Herbs</span>
              </div>
            </div>

            {/* Animated Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div className="flex flex-col">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  <span className="text-brand-red">{counts.years}</span>+
                </div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-cream/60 mt-1">
                  Years of Flavor
                </span>
              </div>

              <div className="flex flex-col">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  <span className="text-brand-brightred">{counts.pizzas}</span>M+
                </div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-cream/60 mt-1">
                  Pizzas Served
                </span>
              </div>

              <div className="flex flex-col">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  <span className="text-brand-gold">{counts.fresh}</span>%
                </div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-cream/60 mt-1">
                  Fresh Ingredients
                </span>
              </div>

              <div className="flex flex-col">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  <span className="text-white">{counts.oven}</span>°C
                </div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-cream/60 mt-1">
                  Stone Oven Heat
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
