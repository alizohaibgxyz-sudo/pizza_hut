"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Tag,
  Flame
} from "lucide-react";
import confetti from "canvas-confetti";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    tax,
    deliveryFee,
    grandTotal,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>("");
  const [isOrdered, setIsOrdered] = useState(false);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "PIZZAFEST30") {
      setAppliedDiscount(0.3); // 30% off
      setPromoMessage("30% Discount Applied! 🎉");
    } else if (code === "CHEESELOVER") {
      setAppliedDiscount(0.2); // 20% off
      setPromoMessage("20% Cheese Feast Discount Applied! 🧀");
    } else {
      setPromoMessage("Invalid promo code. Try PIZZAFEST30");
    }
  };

  const discountAmount = subtotal * appliedDiscount;
  const finalTotal = Math.max(0, grandTotal - discountAmount);

  const handleCheckout = () => {
    // Launch celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D71920", "#FF2A32", "#FFB020", "#FFFFFF"],
    });

    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      setIsOrdered(false);
      setIsCartOpen(false);
    }, 4000);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Slide-out Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-surface/95 backdrop-blur-2xl border-l border-white/10 text-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center ">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg uppercase tracking-tight text-white">
                  Your Pizza Tray
                </h3>
                <span className="text-xs text-brand-cream/60">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in cart
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-brand-cream/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents or Success Message */}
          {isOrdered ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400  animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black uppercase text-white">Order Confirmed!</h4>
              <p className="text-sm text-brand-cream/80 max-w-xs">
                Your artisanal pizzas are now in the 500°C stone oven. Estimated delivery time:{" "}
                <span className="text-brand-gold font-bold">24 mins</span>.
              </p>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-brand-cream/40">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">Your Tray is Empty</h4>
              <p className="text-xs text-brand-cream/60 max-w-xs">
                Explore our signature hand-crafted pizzas and add your favorites to get started!
              </p>
              <a
                href="#menu"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-6 py-2.5 rounded-full bg-brand-red text-white text-xs font-bold uppercase tracking-wider"
              >
                Browse Menu
              </a>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-brand-black flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-white leading-tight">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-brand-cream/40 hover:text-brand-brightred transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] text-brand-cream/60 mt-0.5">
                        {item.size} • {item.crust}
                      </div>
                      {item.extraToppings.length > 0 && (
                        <div className="text-[10px] text-brand-gold mt-0.5 line-clamp-1">
                          +{item.extraToppings.join(", ")}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                      <span className="font-extrabold text-sm text-brand-cream">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>

                      <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && !isOrdered && (
            <div className="p-6 border-t border-white/10 bg-brand-black/60 flex flex-col gap-4">
              {/* Promo Form */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-brand-cream/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. PIZZAFEST30)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase placeholder:normal-case placeholder-brand-cream/40 focus:outline-none focus:border-brand-red"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-brand-cream uppercase"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <div
                  className={`text-[11px] font-semibold ${
                    appliedDiscount > 0 ? "text-emerald-400" : "text-brand-brightred"
                  }`}
                >
                  {promoMessage}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-brand-cream/70 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">{formatPrice(subtotal)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Special Promo Discount</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="font-mono text-white">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-mono text-white">
                    {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="font-mono text-brand-gold text-lg">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-red via-brand-brightred to-brand-darkred text-white font-black text-sm uppercase tracking-wider  hover: hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                data-cursor="ORDER"
              >
                <span>CHECKOUT &amp; BAKE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
