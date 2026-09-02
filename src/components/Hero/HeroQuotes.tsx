"use client";

import React from "react";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

interface HeroQuotesProps {
  progress: number; // 0.0 to 1.0 from GSAP ScrollTrigger
}

export function HeroQuotes({ progress }: HeroQuotesProps) {
  // Helper to compute opacity and scale/transform for smooth bell-curve fades
  const calcSegmentState = (start: number, peakStart: number, peakEnd: number, end: number) => {
    if (progress < start || progress > end) return { opacity: 0, y: 30, scale: 0.95, visible: false };

    let opacity = 0;
    let y = 0;
    let scale = 1;

    if (progress >= start && progress < peakStart) {
      const t = (progress - start) / (peakStart - start);
      opacity = t;
      y = 30 * (1 - t);
      scale = 0.95 + 0.05 * t;
    } else if (progress >= peakStart && progress <= peakEnd) {
      opacity = 1;
      y = 0;
      scale = 1;
    } else if (progress > peakEnd && progress <= end) {
      const t = (progress - peakEnd) / (end - peakEnd);
      opacity = 1 - t;
      y = -30 * t;
      scale = 1 + 0.05 * t;
    }

    return { opacity, y, scale, visible: opacity > 0.01 };
  };

  // Phase 1: Opening Title (0.0 to 0.18)
  const phase1 = calcSegmentState(0.0, 0.02, 0.12, 0.18);

  // Phase 2: "Great things take time." (0.18 to 0.36)
  const phase2 = calcSegmentState(0.18, 0.23, 0.30, 0.36);

  // Phase 3: "Crafted with passion." (0.36 to 0.54)
  const phase3 = calcSegmentState(0.36, 0.41, 0.48, 0.54);

  // Phase 4: "Made fresh. Made unforgettable." (0.54 to 0.72)
  const phase4 = calcSegmentState(0.54, 0.59, 0.66, 0.72);

  // Phase 5: "Every slice tells a story." (0.72 to 0.86)
  const phase5 = calcSegmentState(0.72, 0.76, 0.82, 0.86);

  // Phase 6: Final Hero CTA: "READY FOR YOUR NEXT SLICE?" (0.86 to 1.0)
  const phase6 = calcSegmentState(0.86, 0.91, 1.0, 1.0);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center text-center px-4 sm:px-6">
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-brand-black/90 pointer-events-none" />

      {/* PHASE 1: Opening Title */}
      {phase1.visible && (
        <div
          className="max-w-4xl flex flex-col items-center gap-4 sm:gap-6 transition-transform duration-75 ease-out"
          style={{
            opacity: phase1.opacity,
            transform: `translate3d(0, ${phase1.y}px, 0) scale(${phase1.scale})`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-cream text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase backdrop-blur-md">
            <Flame className="w-4 h-4 text-brand-red" />
            <span>WELCOME TO THE TASTE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.08em] text-white leading-[1.15]">
            THE PERFECT PIZZA <br />
            <span className="text-brand-red font-normal">
              IS A JOURNEY.
            </span>
          </h1>

          <p className="max-w-xl text-sm sm:text-base text-brand-cream/70 font-normal">
            From handcrafted 72-hour slow fermented dough to the final blistering molten slice.
          </p>
        </div>
      )}

      {/* PHASE 2: Quote 1 */}
      {phase2.visible && (
        <div
          className="max-w-3xl flex flex-col items-center gap-3 transition-transform duration-75 ease-out"
          style={{
            opacity: phase2.opacity,
            transform: `translate3d(0, ${phase2.y}px, 0) scale(${phase2.scale})`,
          }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>THE CRAFT BEGINS</span>
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-wide text-white">
            &ldquo;Great things <br />
            <span className="text-brand-red font-normal">take time.</span>&rdquo;
          </h2>
          <p className="text-sm text-brand-cream/60">
            Hand-selected unbleached wheat flour proofed slowly with natural levain.
          </p>
        </div>
      )}

      {/* PHASE 3: Quote 2 */}
      {phase3.visible && (
        <div
          className="max-w-3xl flex flex-col items-center gap-3 transition-transform duration-75 ease-out"
          style={{
            opacity: phase3.opacity,
            transform: `translate3d(0, ${phase3.y}px, 0) scale(${phase3.scale})`,
          }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-brand-red font-semibold">
            ARTISANAL INGREDIENTS
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-wide text-white">
            &ldquo;Crafted with <br />
            <span className="text-brand-amber font-normal">
              passion &amp; fire.
            </span>&rdquo;
          </h2>
          <p className="text-sm text-brand-cream/60">
            Sun-ripened San Marzano tomatoes crushed with sweet garlic and fresh herbs.
          </p>
        </div>
      )}

      {/* PHASE 4: Quote 3 */}
      {phase4.visible && (
        <div
          className="max-w-3xl flex flex-col items-center gap-3 transition-transform duration-75 ease-out"
          style={{
            opacity: phase4.opacity,
            transform: `translate3d(0, ${phase4.y}px, 0) scale(${phase4.scale})`,
          }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold">
            STONE OVEN MASTERY
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-wide text-white">
            &ldquo;Made fresh. <br />
            <span className="text-brand-brightred font-normal">Made unforgettable.</span>&rdquo;
          </h2>
          <p className="text-sm text-brand-cream/60">
            Molten 100% whole milk mozzarella bubbling at 500°C intense heat.
          </p>
        </div>
      )}

      {/* PHASE 5: Quote 4 */}
      {phase5.visible && (
        <div
          className="max-w-3xl flex flex-col items-center gap-3 transition-transform duration-75 ease-out"
          style={{
            opacity: phase5.opacity,
            transform: `translate3d(0, ${phase5.y}px, 0) scale(${phase5.scale})`,
          }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-brand-cream/70 font-semibold">
            THE SIGNATURE SLICE
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-wide text-white">
            &ldquo;Every slice <br />
            <span className="text-brand-red font-normal">
              tells a story.</span>&rdquo;
          </h2>
          <p className="text-sm text-brand-cream/60">
            The crispy crunch, the molten cheese pull, the aroma of savory herbs.
          </p>
        </div>
      )}

      {/* PHASE 6: Final Hero CTA */}
      {phase6.visible && (
        <div
          className="max-w-4xl flex flex-col items-center gap-6 pointer-events-auto transition-transform duration-75 ease-out"
          style={{
            opacity: phase6.opacity,
            transform: `translate3d(0, ${phase6.y}px, 0) scale(${phase6.scale})`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/50 text-brand-gold text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>YOUR PERFECT SLICE AWAITS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.06em] text-white leading-[1.15]">
            READY FOR YOUR <br />
            <span className="text-brand-red font-normal">
              NEXT SLICE?
            </span>
          </h2>

          <p className="max-w-lg text-sm sm:text-base text-brand-cream/70 font-normal">
            Order online now for 30-minute hot delivery, or explore our signature crust collection.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <a
              href="#menu"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-red to-brand-darkred text-white text-sm sm:text-base font-semibold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
              data-cursor="ORDER"
            >
              <span>ORDER NOW</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#crusts"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/60 hover:bg-white/10 border border-white/20 hover:border-white/40 text-brand-cream text-sm sm:text-base font-semibold uppercase tracking-wider backdrop-blur-md hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              data-cursor="EXPLORE"
            >
              <span>EXPLORE CRUSTS</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
