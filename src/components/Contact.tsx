"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Flame, CheckCircle2, ChevronRight } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const info = [
    { icon: MapPin, label: "Address", value: "1247 Fire Stone Avenue, Downtown District, NY 10001" },
    { icon: Phone, label: "Hotline", value: "(800) 555-7499" },
    { icon: Mail, label: "Email", value: "hello@pizzahouse.com" },
    { icon: Clock, label: "Hours", value: "Mon–Thu 11am–11pm · Fri–Sun 10am–Midnight" },
  ];

  const inputClass = "w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-cream/40 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/60 transition-all duration-200";

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 bg-gradient-to-b from-brand-black via-brand-dark to-brand-black overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-red/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-extrabold uppercase tracking-[0.25em] mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            LET&apos;S TALK <br />
            <span className="bg-gradient-to-r from-brand-red via-brand-brightred to-brand-amber bg-clip-text text-transparent text-glow">
              PIZZA.
            </span>
          </h2>
          <p className="max-w-lg text-sm sm:text-base text-brand-cream/70 mt-4">
            Questions, reservations, corporate orders or catering? We&apos;re always here and happy to help.
          </p>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Restaurant Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 flex flex-col gap-5">
              {/* Live Kitchen Status */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-60" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Kitchen Open Now</div>
                  <div className="text-[11px] text-brand-cream/60">Oven Temp: 502°C · Wait: ~18 min</div>
                </div>
              </div>

              {info.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4 pt-4 border-t border-white/5 first:pt-0 first:border-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-brand-red" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-brand-cream/50">{item.label}</div>
                      <div className="text-sm font-semibold text-brand-cream mt-0.5">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:18005557499"
                className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-brand-red/10 hover:bg-brand-red/20 border border-brand-red/30 text-white transition-all group"
              >
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <Phone className="w-5 h-5 text-brand-red" />
                  <span>Call & Place an Order Now</span>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-red group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#menu"
                className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all group"
              >
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <Flame className="w-5 h-5 text-brand-gold" />
                  <span>Browse Menu &amp; Order Online</span>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-cream/40 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl glass-card border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase">Message Received!</h3>
                  <p className="text-sm text-brand-cream/70 max-w-xs">
                    Our team will get back to you within 24 hours. In the meantime, order a pizza!
                  </p>
                  <a href="#menu" className="mt-2 px-6 py-2.5 rounded-full bg-brand-red text-white text-xs font-bold uppercase">
                    View Menu
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] uppercase font-bold tracking-wider text-brand-cream/60">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] uppercase font-bold tracking-wider text-brand-cream/60">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@email.com"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-brand-cream/60">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-brand-cream/60">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your reservation, catering need, or feedback..."
                      rows={5}
                      required
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-red to-brand-darkred text-white font-black text-sm uppercase tracking-wider  hover: hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
