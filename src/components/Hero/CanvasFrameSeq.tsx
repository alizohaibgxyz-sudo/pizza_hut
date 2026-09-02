"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Flame } from "lucide-react";

interface CanvasFrameSeqProps {
  progress: number; // 0.0 to 1.0
  totalFrames?: number;
  onLoaded?: () => void;
}

export function CanvasFrameSeq({
  progress,
  totalFrames = 120,
  onLoaded,
}: CanvasFrameSeqProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const isRenderingRef = useRef<boolean>(false);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Preload all 120 frames strategically
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const padNumber = (num: number) => String(num).padStart(3, "0");

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const filename = `/images/hero-frames/ezgif-frame-${padNumber(i)}.jpg`;
      img.src = filename;

      img.onload = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= Math.min(25, totalFrames) && !isReady) {
          setIsReady(true);
        }
        if (loaded === totalFrames) {
          if (onLoaded) onLoaded();
        }
      };

      img.onerror = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, onLoaded, isReady]);

  // Canvas drawing routine with object-fit: cover preservation
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    // If exact frame isn't loaded yet, try finding nearest loaded frame
    let targetImg = img;
    if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) {
      for (let offset = 1; offset < 10; offset++) {
        const prev = imagesRef.current[frameIdx - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          targetImg = prev;
          break;
        }
        const next = imagesRef.current[frameIdx + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          targetImg = next;
          break;
        }
      }
    }

    if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = targetImg.naturalWidth;
    const imgHeight = targetImg.naturalHeight;

    // Calculate aspect-ratio cover
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;
    const offsetX = (canvasWidth - renderWidth) / 2;
    const offsetY = (canvasHeight - renderHeight) / 2;

    ctx.fillStyle = "#090909";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(targetImg, offsetX, offsetY, renderWidth, renderHeight);

    // Subtle dark gradient vignette overlay directly on canvas for maximum performance
    const gradient = ctx.createRadialGradient(
      canvasWidth / 2,
      canvasHeight / 2,
      Math.min(canvasWidth, canvasHeight) * 0.25,
      canvasWidth / 2,
      canvasHeight / 2,
      Math.max(canvasWidth, canvasHeight) * 0.75
    );
    gradient.addColorStop(0, "rgba(9, 9, 9, 0)");
    gradient.addColorStop(0.7, "rgba(9, 9, 9, 0.45)");
    gradient.addColorStop(1, "rgba(9, 9, 9, 0.95)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }, []);

  // Handle Canvas Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Sync scroll progress to frame index
  useEffect(() => {
    const clampedProgress = Math.min(1, Math.max(0, progress));
    const targetFrame = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(clampedProgress * (totalFrames - 1)))
    );

    if (targetFrame !== currentFrameRef.current) {
      currentFrameRef.current = targetFrame;
      if (!isRenderingRef.current) {
        isRenderingRef.current = true;
        requestAnimationFrame(() => {
          drawFrame(targetFrame);
          isRenderingRef.current = false;
        });
      }
    }
  }, [progress, totalFrames, drawFrame]);

  // Initial draw when ready
  useEffect(() => {
    if (isReady) {
      drawFrame(0);
    }
  }, [isReady, drawFrame]);

  const loadPercent = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-brand-black">
      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{
          filter: "contrast(1.05) saturate(1.1)",
        }}
      />

      {/* Loading Progress Screen */}
      {!isReady && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-brand-black/95 backdrop-blur-xl gap-4">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-red/20 border border-brand-red/40 ">
            <Flame className="w-8 h-8 text-brand-red animate-pulse" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-brand-cream">
              IGNITING WOOD FIRED KITCHEN
            </span>
            <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-brand-red to-brand-amber transition-all duration-200"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-brand-cream/60">
              {loadPercent}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
