"use client";

import React, { useState, useMemo } from "react";
import { PIZZAS, PizzaItem } from "@/data/pizzas";
import { PizzaCard } from "./PizzaCard";
import { Sparkles, Flame, Search, Filter } from "lucide-react";

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const categories = [
    { id: "all", label: "All Pizzas" },
    { id: "signature", label: "Signature" },
    { id: "meat", label: "Meat Lovers" },
    { id: "cheese", label: "Cheesy Craving" },
    { id: "spicy", label: "Spicy Diablo" },
    { id: "veggie", label: "Veggie Garden" },
  ];

  const filteredPizzas = useMemo(() => {
    let result = PIZZAS.filter((pizza) => {
      const matchCat = activeCategory === "all" || pizza.category === activeCategory;
      const matchSearch =
        pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pizza.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pizza.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section
      id="menu"
      className="relative py-28 sm:py-36 bg-brand-black overflow-hidden border-t border-white/5"
    >
      {/* Ambient Red Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-red/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-extrabold uppercase tracking-[0.25em] mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>ARTISANAL SELECTION</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            FIND YOUR <br />
            <span className="bg-gradient-to-r from-brand-red via-brand-brightred to-brand-amber bg-clip-text text-transparent text-glow">
              PERFECT SLICE.
            </span>
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-brand-cream/70 mt-4 leading-relaxed">
            Crafted with our 72-hour slow-fermented dough, whole milk mozzarella, and baked fresh on blazing stone hearths.
          </p>
        </div>

        {/* Filter and Search Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-brand-red text-white  scale-105"
                    : "bg-white/5 hover:bg-white/10 text-brand-cream/70 hover:text-white border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-brand-cream/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pizzas or toppings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-brand-cream/40 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-brand-cream/80 focus:outline-none focus:border-brand-red"
            >
              <option value="featured" className="bg-brand-surface text-white">Featured</option>
              <option value="rating" className="bg-brand-surface text-white">Top Rated</option>
              <option value="price-asc" className="bg-brand-surface text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-brand-surface text-white">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Pizzas Grid */}
        {filteredPizzas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredPizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-brand-cream/40">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Pizzas Match Your Search</h3>
            <p className="text-sm text-brand-cream/60 max-w-sm mb-6">
              Try adjusting your category filters or search keywords to find delicious pizzas.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-brand-red text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
