"use client";

import React from "react";
import { Bike, Store, UtensilsCrossed, PartyPopper, Clock, ShieldCheck, ChevronRight, Flame } from "lucide-react";

export function Services() {
  const services = [
    {
      id: "delivery",
      title: "Fast Hot Delivery",
      subtitle: "30-Min Fresh & Hot Guarantee",
      description: "Direct to your door in specialized temperature-monitored thermal pizza vaults ensuring piping hot crust and melted cheese.",
      icon: Bike,
      badge: "Fastest in Town",
      stats: "Average 24 mins",
      accent: "from-brand-red to-brand-darkred",
    },
    {
      id: "pickup",
      title: "Express Carryout",
      subtitle: "Zero-Wait Warm Counter",
      description: "Order via mobile or web and pick up straight from our heated express lockers with zero waiting in line.",
      icon: Store,
      badge: "Save 15%",
      stats: "Ready in 12 mins",
      accent: "from-brand-amber to-brand-darkred",
    },
    {
      id: "dine-in",
      title: "Artisan Dine-In",
      subtitle: "Full Italian Kitchen Vibe",
      description: "Savor the ambiance with stone oven views, fresh herb gardens, craft sodas, and tableside hot honey & chili oil service.",
      icon: UtensilsCrossed,
      badge: "Atmosphere",
      stats: "Open till Midnight",
      accent: "from-brand-brightred to-brand-red",
    },
    {
      id: "catering",
      title: "Party & Event Catering",
      subtitle: "Custom Feasts for Groups",
      description: "From corporate luncheons to birthday bashes and game nights. Modular pizza boxes, wings, and signature desserts.",
      icon: PartyPopper,
      badge: "Group Deals",
      stats: "Up to 500+ Pizzas",
      accent: "from-brand-gold to-brand-amber",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 bg-brand-black overflow-hidden border-t border-white/5"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-extrabold uppercase tracking-[0.25em] mb-4">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>HOW WE SERVE YOU</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            WE BRING THE PIZZA <br />
            <span className="bg-gradient-to-r from-brand-red via-brand-brightred to-brand-amber bg-clip-text text-transparent text-glow">
              TO YOU.
            </span>
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-brand-cream/70 mt-4 leading-relaxed">
            Whether relaxing at home, dining with friends, or hosting a celebration, we craft the ultimate pizza experience for every occasion.
          </p>
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="group relative flex flex-col justify-between p-7 rounded-3xl glass-card hover:border-brand-red/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(215,25,32,0.2)]"
                data-cursor="EXPLORE"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.accent} flex items-center justify-center text-white  group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-brand-cream/80">
                      {svc.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold uppercase tracking-tight text-white group-hover:text-brand-brightred transition-colors">
                    {svc.title}
                  </h3>
                  <span className="text-xs font-semibold text-brand-gold mt-1 block">
                    {svc.subtitle}
                  </span>

                  <p className="text-xs text-brand-cream/70 mt-3 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                {/* Footer details */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-brand-cream/60 font-medium">
                    <Clock className="w-3.5 h-3.5 text-brand-red" />
                    <span>{svc.stats}</span>
                  </div>

                  <a
                    href="#menu"
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-red flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
