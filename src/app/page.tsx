"use client";

import React, { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About";
import { Menu } from "@/components/Menu/Menu";
import { PizzaTypes } from "@/components/PizzaTypes";
import { Services } from "@/components/Services";
import { Offers } from "@/components/Offers";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { OrderModal } from "@/components/Menu/OrderModal";
import { CustomCursor } from "@/components/CustomCursor";
import { useCart } from "@/context/CartContext";

function MainContent() {
  useLenis();
  const { selectedPizzaForModal } = useCart();

  useEffect(() => {
    // Scroll reveal animations for sections
    const sections = document.querySelectorAll("[data-reveal]");
    sections.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* Subtle Film Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Glassmorphic Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="relative">
        {/* 1. Cinematic Frame-by-Frame Hero */}
        <Hero />

        {/* 2. Brand Story & Editorial About */}
        <div data-reveal>
          <About />
        </div>

        {/* 3. Premium Interactive Pizza Menu */}
        <div data-reveal>
          <Menu />
        </div>

        {/* 4. Interactive Pizza Crust Explorer */}
        <div data-reveal>
          <PizzaTypes />
        </div>

        {/* 5. Services & Delivery Modes */}
        <div data-reveal>
          <Services />
        </div>

        {/* 6. Special Deals & Promo Codes */}
        <div data-reveal>
          <Offers />
        </div>

        {/* 7. Why Choose Us — Quality Pillars */}
        <div data-reveal>
          <WhyChooseUs />
        </div>

        {/* 8. Customer Testimonial Carousel */}
        <div data-reveal>
          <Testimonials />
        </div>

        {/* 9. Contact & Reservation Form */}
        <div data-reveal>
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Side Drawer */}
      <CartDrawer />

      {/* Pizza Customizer Modal */}
      {selectedPizzaForModal && <OrderModal />}
    </>
  );
}

export default function Page() {
  return <MainContent />;
}
