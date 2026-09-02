import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pizza House | Artisanal Fire Kitchen",
  description: "Premium hand-crafted pizzas baked in 500°C beechwood stone ovens. Order now for 30-minute hot delivery.",
  keywords: "pizza, artisanal pizza, stuffed crust, delivery, fire oven, hand-tossed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-brand-black text-brand-offwhite`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
