"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { X, Star, Flame, Plus, Minus, Check, Sparkles } from "lucide-react";

export function OrderModal() {
  const { selectedPizzaForModal, setSelectedPizzaForModal, addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<"Medium (12\")" | "Large (14\")" | "Party Size (16\")">("Large (14\")");
  const [selectedCrust, setSelectedCrust] = useState<string>("");
  const [extraCheese, setExtraCheese] = useState<boolean>(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (selectedPizzaForModal) {
      setSelectedCrust(selectedPizzaForModal.crustOptions[0] || "Classic Hand-Tossed");
      setSelectedSize("Large (14\")");
      setExtraCheese(false);
      setSelectedAddons([]);
      setQuantity(1);
    }
  }, [selectedPizzaForModal]);

  if (!selectedPizzaForModal) return null;

  const pizza = selectedPizzaForModal;

  const sizeMultipliers = {
    "Medium (12\")": 0.85,
    "Large (14\")": 1.0,
    "Party Size (16\")": 1.3,
  };

  const crustAddons: Record<string, number> = {
    "Stuffed Crust": 2.99,
    "Pan Pizza": 1.99,
    "Thin 'N Crispy": 0,
    "Classic Hand-Tossed": 0,
  };

  const availableAddons = [
    { name: "Extra Mozzarella Shield", price: 2.49 },
    { name: "Hot Blossom Honey Drizzle", price: 1.99 },
    { name: "Garlic Butter Crust Dipper", price: 1.49 },
    { name: "Crispy Bacon Crumbles", price: 2.99 },
    { name: "Calabrian Chili Oil Infusion", price: 1.99 },
  ];

  const toggleAddon = (name: string) => {
    setSelectedAddons((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const calculateUnitTotal = () => {
    let base = pizza.price * sizeMultipliers[selectedSize];
    if (crustAddons[selectedCrust]) base += crustAddons[selectedCrust];
    if (extraCheese) base += 2.49;
    selectedAddons.forEach((addon) => {
      const match = availableAddons.find((a) => a.name === addon);
      if (match) base += match.price;
    });
    return base;
  };

  const unitTotal = calculateUnitTotal();
  const grandTotal = unitTotal * quantity;

  const handleAddToCart = () => {
    addToCart({
      pizzaId: pizza.id,
      name: pizza.name,
      image: pizza.image,
      crust: selectedCrust,
      size: selectedSize,
      extraCheese,
      extraToppings: selectedAddons,
      unitPrice: unitTotal,
      quantity,
    });
    setSelectedPizzaForModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedPizzaForModal(null)}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-white/10">
          <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-brand-black">
            <Image
              src={pizza.image}
              alt={pizza.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
            {pizza.badge && (
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-red text-white text-[11px] font-bold uppercase shadow-lg">
                {pizza.badge}
              </div>
            )}
          </div>

          <div className="md:col-span-7 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-brand-gold text-xs font-bold">
              <Star className="w-4 h-4 fill-brand-gold" />
              <span>{pizza.rating}</span>
              <span className="text-brand-cream/50 font-normal">({pizza.reviewCount} reviews)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              {pizza.name}
            </h2>
            <p className="text-xs text-brand-cream/70 leading-relaxed">
              {pizza.description}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-semibold text-brand-cream/60">Ingredients:</span>
              <div className="flex flex-wrap gap-1 text-[11px] text-brand-cream/80 font-medium">
                {pizza.ingredients.slice(0, 3).join(", ")}...
              </div>
            </div>
          </div>
        </div>

        {/* Customization Options */}
        <div className="flex flex-col gap-6 py-6 border-b border-white/10">
          {/* 1. Size Choice */}
          <div>
            <label className="text-xs uppercase font-extrabold tracking-wider text-brand-cream block mb-3">
              1. Select Size
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["Medium (12\")", "Large (14\")", "Party Size (16\")"] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border ${
                    selectedSize === sz
                      ? "bg-brand-red text-white border-brand-red "
                      : "bg-white/5 hover:bg-white/10 text-brand-cream/80 border-white/10"
                  }`}
                >
                  <div>{sz.split(" ")[0]}</div>
                  <span className="text-[10px] font-normal text-brand-cream/60">{sz.split(" ")[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Crust Choice */}
          <div>
            <label className="text-xs uppercase font-extrabold tracking-wider text-brand-cream block mb-3">
              2. Select Crust Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {pizza.crustOptions.map((crust) => (
                <button
                  key={crust}
                  onClick={() => setSelectedCrust(crust)}
                  className={`p-3 rounded-xl text-left text-xs font-bold transition-all border ${
                    selectedCrust === crust
                      ? "bg-brand-red text-white border-brand-red "
                      : "bg-white/5 hover:bg-white/10 text-brand-cream/80 border-white/10"
                  }`}
                >
                  <div>{crust}</div>
                  <span className="text-[10px] font-normal text-brand-cream/60">
                    {crustAddons[crust] ? `+${formatPrice(crustAddons[crust])}` : "Included"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Gourmet Upgrades & Drizzles */}
          <div>
            <label className="text-xs uppercase font-extrabold tracking-wider text-brand-cream block mb-3">
              3. Gourmet Add-Ons &amp; Dips
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {availableAddons.map((addon) => {
                const checked = selectedAddons.includes(addon.name);
                return (
                  <button
                    key={addon.name}
                    onClick={() => toggleAddon(addon.name)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all border ${
                      checked
                        ? "bg-brand-red/20 border-brand-red text-white"
                        : "bg-white/5 hover:bg-white/10 text-brand-cream/80 border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          checked ? "bg-brand-red border-brand-red text-white" : "border-white/30"
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{addon.name}</span>
                    </div>
                    <span className="text-brand-gold font-bold">+{formatPrice(addon.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-1.5">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-black text-lg text-white">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto flex-1 sm:max-w-md py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-red via-brand-brightred to-brand-darkred text-white font-black text-sm uppercase tracking-wider  hover: hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between"
          >
            <span>ADD TO ORDER</span>
            <span className="text-brand-gold font-mono">{formatPrice(grandTotal)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
