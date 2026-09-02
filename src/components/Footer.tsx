"use client";

import React, { useState } from "react";
import { Flame, Instagram, Facebook, Youtube, Music2, ChevronRight, Send, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const navLinks = {
    Explore: [
      { label: "Home", href: "#hero" },
      { label: "Our Menu", href: "#menu" },
      { label: "Crust Styles", href: "#crusts" },
      { label: "Services", href: "#services" },
      { label: "Our Story", href: "#about" },
      { label: "Special Deals", href: "#deals" },
    ],
    Support: [
      { label: "FAQs", href: "#" },
      { label: "Delivery Policy", href: "#" },
      { label: "Allergy Guide", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Careers", href: "#" },
    ],
  };

  const socials = [
    { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-400" },
    { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-blue-400" },
    { icon: Music2, label: "TikTok", href: "#", color: "hover:text-brand-cream" },
    { icon: Youtube, label: "YouTube", href: "#", color: "hover:text-brand-red" },
  ];

  return (
    <footer className="relative bg-[#060606] border-t border-white/8 overflow-hidden">
      {/* Top Red Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      {/* Background Lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pt-16 pb-10 border-b border-white/8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-red to-brand-darkred flex items-center justify-center  group-hover: transition-all">
                <Flame className="w-6 h-6 text-white animate-pulse" />
                <div className="absolute -top-1 w-6 h-1 bg-brand-gold rounded-full opacity-90" />
              </div>
              <div>
                <div className="text-2xl font-black tracking-tighter text-white uppercase">
                  PIZZA<span className="text-brand-red">HOUSE</span>
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-cream/50">
                  Artisanal Fire Kitchen
                </div>
              </div>
            </a>

            <p className="text-sm text-brand-cream/60 leading-relaxed max-w-xs">
              Obsessively hand-crafted pizzas baked in 500°C beechwood stone ovens. 
              Every pizza is a commitment to flavour, freshness, and fire.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-brand-cream/60 ${social.color} transition-all duration-200 hover:scale-110 hover:border-white/20`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Quick Contact Info */}
            <div className="flex flex-col gap-2 text-xs text-brand-cream/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                <span>1247 Fire Stone Ave, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                <span>(800) 555-7499</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                <span>hello@pizzahouse.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          {Object.entries(navLinks).map(([section, links]) => (
            <div key={section} className="lg:col-span-2 flex flex-col gap-4">
              <h4 className="text-xs uppercase font-extrabold tracking-[0.25em] text-brand-cream/40">
                {section}
              </h4>
              <nav className="flex flex-col gap-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-brand-cream/60 hover:text-brand-red transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-brand-cream/20 group-hover:text-brand-red transition-colors" />
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h4 className="text-xs uppercase font-extrabold tracking-[0.25em] text-brand-cream/40">
              Newsletter
            </h4>
            <p className="text-sm text-brand-cream/60 leading-relaxed">
              Get exclusive deals, new pizza drops, and secret promo codes delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-brand-cream/40 focus:outline-none focus:border-brand-red transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-brightred text-white flex items-center justify-center transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <div className="text-xs text-emerald-400 font-semibold">
                ✓ You&apos;re on the list! Expect exclusive deals soon.
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              {["Certified Fresh", "100% Dairy", "Family Friendly", "Award Winning"].map((badge) => (
                <span key={badge} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-[10px] font-bold text-brand-cream/50 uppercase tracking-wider">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-brand-cream/30">
            © 2026 Pizza House. All rights reserved. Crafted with fire, passion &amp; code.
          </p>
          <div className="flex items-center gap-4 text-xs text-brand-cream/30">
            <a href="#" className="hover:text-brand-cream/60 transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-brand-cream/60 transition-colors">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-brand-cream/60 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
