"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, Copy, Check, Flame, Tag } from "lucide-react";

export function Offers() {
  const [copied, setCopied] = useState<string | null>(null);
  const [countdown, setCountdown] = useState({ h: 4, m: 23, s: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  const deals = [
    {
      code: "PIZZAFEST30",
      title: "30% OFF Today Only",
      subtitle: "Valid on all orders above $30. One-time use per account.",
      color: "from-brand-red to-brand-darkred",
      highlight: "Most Popular",
    },
    {
      code: "CHEESELOVER",
      title: "20% OFF Cheese Pizzas",
      subtitle: "All our 4-cheese and stuffed crust varieties. No minimum.",
      color: "from-brand-amber to-brand-red",
      highlight: "Fan Favorite",
    },
    {
      code: "FREESHIP50",
      title: "FREE Delivery on $50+",
      subtitle: "Free delivery all day. Every day. No hidden fees.",
      color: "from-brand-surface to-brand-charcoal",
      highlight: "Always On",
    },
  ];

  return (
    <section
      id="deals"
      className="relative py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-brand-black via-[#0F0505] to-brand-black border-t border-white/5"
    >
      {/* Ambient Red Background Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(215,25,32,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating decorative shapes */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-brand-red/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-brand-amber/10 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-extrabold uppercase tracking-[0.25em] mb-4">
            <Tag className="w-3.5 h-3.5" />
            <span>LIMITED TIME OFFERS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            MORE PIZZA. <br />
            <span className="bg-gradient-to-r from-brand-red via-brand-brightred to-brand-amber bg-clip-text text-transparent text-glow">
              MORE HAPPINESS.
            </span>
          </h2>
          <p className="max-w-lg text-sm sm:text-base text-brand-cream/70 mt-4 leading-relaxed">
            Get your favorite pizzas and make tonight a pizza night. These deals disappear fast.
          </p>
        </div>

        {/* Live Countdown Timer */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-3 p-5 rounded-2xl glass-card border border-brand-red/30 ">
            <Flame className="w-5 h-5 text-brand-red animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-widest text-brand-cream/70">DEALS EXPIRE IN</span>
            <div className="flex items-center gap-2 font-mono text-xl font-black text-white">
              <span className="px-3 py-1.5 bg-brand-red/20 rounded-lg text-brand-brightred">{pad(countdown.h)}</span>
              <span className="text-brand-red/60">:</span>
              <span className="px-3 py-1.5 bg-brand-red/20 rounded-lg text-brand-brightred">{pad(countdown.m)}</span>
              <span className="text-brand-red/60">:</span>
              <span className="px-3 py-1.5 bg-brand-red/20 rounded-lg text-brand-brightred">{pad(countdown.s)}</span>
            </div>
          </div>
        </div>

        {/* Deal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {deals.map((deal) => (
            <div
              key={deal.code}
              className="group relative rounded-3xl glass-card border border-white/10 hover:border-brand-red/40 p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(215,25,32,0.2)]"
            >
              {deal.highlight && (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-brand-red text-white text-[10px] font-black uppercase tracking-wider ">
                  {deal.highlight}
                </div>
              )}
              <div className={`inline-block px-4 py-1.5 rounded-xl bg-gradient-to-r ${deal.color} text-white text-xl font-black font-mono tracking-widest mb-4 shadow-lg`}>
                {deal.code}
              </div>
              <h3 className="text-lg font-black uppercase text-white">{deal.title}</h3>
              <p className="text-xs text-brand-cream/60 mt-2 mb-5">{deal.subtitle}</p>
              <button
                onClick={() => handleCopy(deal.code)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-brand-red/20 border border-white/10 hover:border-brand-red/50 text-xs font-bold text-brand-cream hover:text-white transition-all"
              >
                {copied === deal.code ? (
                  <><Check className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400">COPIED!</span></>
                ) : (
                  <><Copy className="w-4 h-4" /><span>COPY CODE</span></>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Hero Deal Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-brand-red/30 ">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-red/30 to-brand-black" />
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=1600&q=80"
              alt="Special Pizza Deal"
              fill
              className="object-cover opacity-20 mix-blend-luminosity"
              sizes="100vw"
            />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 sm:p-12">
            <div>
              <div className="text-brand-gold text-xs font-extrabold uppercase tracking-[0.3em] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>WEEKEND FIRE SPECIAL</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                BUY 2 GET 1 <span className="text-brand-red text-glow">FREE</span>
              </h3>
              <p className="text-sm text-brand-cream/80 mt-2 max-w-md">
                Order any 2 large or party-size pizzas and we&apos;ll add a third pizza of equal or lesser value absolutely FREE.
              </p>
            </div>
            <a
              href="#menu"
              className="flex-shrink-0 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-red to-brand-darkred text-white font-black text-sm uppercase tracking-wider  hover: hover:scale-105 transition-all whitespace-nowrap"
              data-cursor="ORDER"
            >
              CLAIM OFFER
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
