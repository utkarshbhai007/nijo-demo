"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "@/components/animations/magnetic-wrapper";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Universe", href: "/universe" },
  { name: "Characters", href: "/characters" },
  { name: "About", href: "/about" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Scroll Hide/Show & Blur Logic
  useGSAP(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Blur effect
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show animation
      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !isMobileMenuOpen) {
        gsap.to(navRef.current, { yPercent: -100, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.to(navRef.current, { yPercent: 0, duration: 0.4, ease: "power3.out" });
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Mobile Menu Animation
  useGSAP(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        clipPath: "circle(150% at calc(100% - 2rem) 2rem)",
        duration: 0.8,
        ease: "power3.inOut",
        display: "flex"
      });
      gsap.fromTo(".mobile-link", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power3.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: "circle(0% at calc(100% - 2rem) 2rem)",
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          if (mobileMenuRef.current) mobileMenuRef.current.style.display = "none";
        }
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          isScrolled ? "bg-secondary-bg/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Left */}
          <Link href="/" className="relative z-50 text-2xl font-bold tracking-tighter text-white">
            KIRIT<span className="text-accent-primary">.</span>
          </Link>

          {/* Menu Center (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <MagneticWrapper key={link.name} strength={0.3}>
                  <Link
                    href={link.href}
                    className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors block px-2 py-1"
                  >
                    {link.name}
                    {/* Underline Animation & Active Indicator */}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-[2px] bg-accent-primary transition-all duration-300 ease-out",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                </MagneticWrapper>
              );
            })}
          </nav>

          {/* Hamburger Right / CTA */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block btn-cinematic text-sm px-6 py-2">
              Pre-order
            </button>
            <button
              className="relative z-50 md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 h-[100dvh] z-40 bg-secondary-bg/95 backdrop-blur-xl flex-col items-center justify-center hidden"
        style={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "mobile-link text-4xl font-bold tracking-tight",
                  isActive ? "text-accent-primary" : "text-white"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <button className="mobile-link mt-8 btn-primary text-lg w-full max-w-xs">
            Pre-order Now
          </button>
        </nav>
      </div>
    </>
  );
}
