"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PizzaItem } from "@/data/pizzas";

export interface CartItem {
  id: string; // unique cart line item id
  pizzaId: string;
  name: string;
  image: string;
  crust: string;
  size: "Medium (12\")" | "Large (14\")" | "Party Size (16\")";
  extraCheese: boolean;
  extraToppings: string[];
  unitPrice: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedPizzaForModal: PizzaItem | null;
  setSelectedPizzaForModal: (pizza: PizzaItem | null) => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPizzaForModal, setSelectedPizzaForModal] = useState<PizzaItem | null>(null);

  // Initialize with an example item so user can see cart in action immediately
  useEffect(() => {
    setCart([
      {
        id: "sample-1",
        pizzaId: "pepperoni-lovers",
        name: "Pepperoni Supreme",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1000&q=80",
        crust: "Stuffed Cheesy Crust",
        size: "Large (14\")",
        extraCheese: true,
        extraToppings: ["Hot Honey Drizzle"],
        unitPrice: 22.98,
        quantity: 1,
      },
    ]);
  }, []);

  const addToCart = (item: Omit<CartItem, "id">) => {
    const id = `${item.pizzaId}-${item.crust}-${item.size}-${Date.now()}`;
    setCart((prev) => [...prev, { ...item, id }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.0825; // 8.25%
  const deliveryFee = subtotal > 0 ? (subtotal > 40 ? 0 : 3.99) : 0;
  const grandTotal = subtotal + tax + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        selectedPizzaForModal,
        setSelectedPizzaForModal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        tax,
        deliveryFee,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
