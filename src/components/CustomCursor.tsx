"use client";

import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer
    if (window.matchMedia("(pointer: fine)").matches && !reducedMotion) {
      setEnabled(true);
    } else {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else if (target.closest("button, a, input, select, textarea, [role='button']")) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    let animationFrameId: number;

    const render = () => {
      // Smooth interpolation for ring
      pos.current.x += (pos.current.targetX - pos.current.x) * 0.2;
      pos.current.y += (pos.current.targetY - pos.current.y) * 0.2;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${pos.current.targetX}px, ${pos.current.targetY}px, 0) translate(-50%, -50%)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  if (!enabled) return null;

  return (
    <>
      {/* Small Precision Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2.5 h-2.5 bg-brand-red rounded-full  transition-opacity duration-300"
        style={{
          opacity: isHovered && cursorText ? 0 : 1,
        }}
      />

      {/* Floating Interactive Ring / Pill */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out border ${
          cursorText
            ? "w-20 h-20 bg-brand-red/90 text-white font-bold text-xs tracking-widest uppercase border-brand-brightred  backdrop-blur-sm"
            : isHovered
            ? "w-14 h-14 bg-white/10 border-brand-red/70 backdrop-blur-[2px] "
            : "w-8 h-8 bg-transparent border-white/30"
        }`}
      >
        {cursorText && (
          <span className="animate-pulse">{cursorText}</span>
        )}
      </div>
    </>
  );
}
