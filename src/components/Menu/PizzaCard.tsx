"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PizzaItem } from "@/data/pizzas";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Star, Flame, Clock, Plus, SlidersHorizontal, Check } from "lucide-react";

interface PizzaCardProps {
  pizza: PizzaItem;
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  const { addToCart, setSelectedPizzaForModal } = useCart();
  const [selectedCrust, setSelectedCrust] = useState(pizza.crustOptions[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      pizzaId: pizza.id,
      name: pizza.name,
      image: pizza.image,
      crust: selectedCrust,
      size: 'Large (14")',
      extraCheese: false,
      extraToppings: [],
      unitPrice: pizza.price,
      quantity: 1,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case "Best Seller":
        return "bg-brand-red text-white ";
      case "Chef's Choice":
        return "bg-brand-gold text-black font-extrabold ";
      case "Hot & Spicy":
        return "bg-brand-brightred text-white ";
      default:
        return "bg-white/20 text-white backdrop-blur-md";
    }
  };

  return (
    <div
      onClick={() => setSelectedPizzaForModal(pizza)}
      className="group relative flex flex-col justify-between rounded-3xl glass-card hover:border-brand-red/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(215,25,32,0.25)] cursor-pointer overflow-hidden p-5 sm:p-6"
      data-cursor="TASTE"
    >
      {/* Top Ambient Glow on Hover */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-brand-red/0 group-hover:bg-brand-red/20 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

      {/* Card Content Top: Image & Badges */}
      <div>
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-brand-black/50">
          <Image
            src={pizza.image}
            alt={pizza.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badge Overlays */}
          {pizza.badge && (
            <div
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getBadgeStyle(
                pizza.badge
              )}`}
            >
              {pizza.badge}
            </div>
          )}

          {/* Prep time badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-brand-cream/90">
            <Clock className="w-3.5 h-3.5 text-brand-gold" />
            <span>{pizza.prepTime}</span>
          </div>

          {/* Spice level badge if spicy */}
          {pizza.spiciness > 0 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold text-brand-brightred">
              {Array.from({ length: pizza.spiciness }).map((_, i) => (
                <Flame key={i} className="w-3 h-3 fill-brand-brightred text-brand-brightred" />
              ))}
            </div>
          )}
        </div>

        {/* Rating & Review */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-brand-gold text-xs font-bold">
            <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
            <span>{pizza.rating.toFixed(1)}</span>
            <span className="text-brand-cream/50 font-normal">({pizza.reviewCount.toLocaleString()})</span>
          </div>
          <span className="text-xs text-brand-cream/60 font-medium">{pizza.calories}</span>
        </div>

        {/* Name & Tagline */}
        <h3 className="text-xl font-extrabold uppercase tracking-tight text-white group-hover:text-brand-brightred transition-colors line-clamp-1">
          {pizza.name}
        </h3>
        <p className="text-xs text-brand-cream/70 mt-1 line-clamp-2 leading-relaxed">
          {pizza.description}
        </p>

        {/* Crust Quick Selector */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="text-[10px] uppercase font-bold tracking-wider text-brand-cream/50 mb-2">
            Select Crust:
          </div>
          <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
            {pizza.crustOptions.slice(0, 3).map((crust) => (
              <button
                key={crust}
                onClick={() => setSelectedCrust(crust)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  selectedCrust === crust
                    ? "bg-brand-red text-white "
                    : "bg-white/5 hover:bg-white/10 text-brand-cream/70 hover:text-white"
                }`}
              >
                {crust}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Add Actions */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-cream/50">Price</span>
          <span className="text-2xl font-black text-white tracking-tight">
            {formatPrice(pizza.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Customizer Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPizzaForModal(pizza);
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-brand-cream hover:text-white transition-all"
            title="Customize Pizza"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 ${
              isAdded
                ? "bg-emerald-600 text-white "
                : "bg-gradient-to-r from-brand-red to-brand-darkred text-white hover: hover:scale-105"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
