"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Flame, 
  PhoneCall, 
  ChevronRight,
  Clock
} from "lucide-react";

interface NavbarProps {
  onOrderClick?: () => void;
}

export function Navbar({ onOrderClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Menu", href: "#menu" },
    { label: "Crust Styles", href: "#crusts" },
    { label: "Services", href: "#services" },
    { label: "Special Deals", href: "#deals" },
    { label: "Story", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "py-3.5 bg-brand-black/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "py-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent backdrop-blur-[2px]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#hero"
            className="group flex items-center gap-3 text-white transition-transform duration-300 hover:scale-105"
            data-cursor="TASTE"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-brand-red to-brand-darkred  group-hover: transition-all">
              <Flame className="w-6 h-6 text-white animate-pulse" />
              {/* Pizza Hut-inspired roof silhouette accent */}
              <div className="absolute -top-1 w-6 h-1 bg-brand-gold rounded-full opacity-90" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tighter text-xl sm:text-2xl text-white uppercase">
                  PIZZA<span className="text-brand-red ml-0.5">HOUSE</span>
                </span>
              </div>
              <span className="text-[10px] tracking-[0.25em] text-brand-cream/60 font-semibold uppercase -mt-1">
                Artisanal Fire Kitchen
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/40 border border-white/10 rounded-full px-5 py-2 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-cream/80 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-red rounded-full transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}
          </nav>

          {/* Right Action: Cart & Order CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-brand-cream hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="View Order Cart"
              data-cursor="CART"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 bg-brand-red text-white text-[11px] font-extrabold rounded-full  animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Main Order CTA Button */}
            <a
              href="#menu"
              onClick={onOrderClick}
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-black"
              data-cursor="ORDER"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-brand-red via-brand-brightred to-brand-amber rounded-full animate-spin-slow opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-red to-brand-darkred text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 group-hover:bg-opacity-90  group-hover:">
                <span>ORDER NOW</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-cream hover:text-white transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 transition-all duration-500 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-6"
        }`}
      >
        <div className="pt-20 flex flex-col gap-6">
          <div className="text-xs uppercase font-bold tracking-[0.25em] text-brand-red">
            Navigation Menu
          </div>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-brand-cream/90 hover:text-brand-red flex items-center justify-between transition-colors border-b border-white/10 pb-3"
                style={{
                  transitionDelay: `${idx * 40}ms`,
                }}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-6 h-6 text-brand-red/60" />
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 pb-6 border-t border-white/10 pt-6">
          <div className="flex items-center gap-3 text-xs text-brand-cream/70">
            <Clock className="w-4 h-4 text-brand-red" />
            <span>Open Today: 10:00 AM – Midnight</span>
          </div>
          <a
            href="tel:18005557499"
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10"
          >
            <PhoneCall className="w-4 h-4 text-brand-red" />
            <span>Call Hotline: (800) 555-PIZZA</span>
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-red to-brand-darkred text-white text-center font-extrabold tracking-wider uppercase "
          >
            START YOUR ORDER
          </a>
        </div>
      </div>
    </>
  );
}
