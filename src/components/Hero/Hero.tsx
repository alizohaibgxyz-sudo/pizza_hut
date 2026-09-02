"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CanvasFrameSeq } from "./CanvasFrameSeq";
import { HeroQuotes } from "./HeroQuotes";
import { ScrollIndicator } from "./ScrollIndicator";

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [indicatorOpacity, setIndicatorOpacity] = useState<number>(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
      onUpdate: (self) => {
        const prog = self.progress;
        setScrollProgress(prog);

        // Fade out scroll indicator quickly within the first 6% of scrolling
        if (prog <= 0.06) {
          setIndicatorOpacity(1 - prog / 0.06);
        } else {
          setIndicatorOpacity(0);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[350vh] bg-brand-black"
    >
      {/* Sticky Fullscreen Viewport Window (100vw x 100vh) */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden"
      >
        {/* 120-Frame Canvas Sequence Renderer */}
        <CanvasFrameSeq progress={scrollProgress} totalFrames={120} />

        {/* Scroll-Triggered Dynamic Typography & Narrative Quotes */}
        <HeroQuotes progress={scrollProgress} />

        {/* Pulsing Scroll Indicator */}
        <ScrollIndicator opacity={indicatorOpacity} />

        {/* Subtle Ambient Red Glow Flare in Top-Right Corner */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />
      </div>
    </section>
  );
}
