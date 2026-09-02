"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  opacity?: number;
}

export function ScrollIndicator({ opacity = 1 }: ScrollIndicatorProps) {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-cream/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
        SCROLL TO DISCOVER
      </span>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 border border-white/20 backdrop-blur-sm animate-bounce text-brand-red ">
        <ChevronDown className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}
