"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function LoadingScreen() {
  const [isComplete, setIsComplete] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  // Prevent scrolling while loading
  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isComplete]);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
      }
    });

    // 1. Fade in the logo text and particles
    tl.fromTo(".loading-text", 
      { opacity: 0, y: 20, letterSpacing: "10px" }, 
      { opacity: 1, y: 0, letterSpacing: "20px", duration: 1.2, ease: "power3.out" }
    );

    // 2. Animate the progress bar filling up
    tl.fromTo(".progress-fill",
      { width: "0%" },
      { width: "100%", duration: 2, ease: "power2.inOut" },
      "-=0.5"
    );

    // 3. Optional counter ticking up
    tl.fromTo(".progress-number",
      { textContent: 0 },
      { 
        textContent: 100, 
        duration: 2, 
        ease: "power2.inOut", 
        snap: { textContent: 1 },
        modifiers: {
          textContent: (val) => `${Math.round(val)}%`
        }
      },
      "<" // same time as progress fill
    );

    // 4. Fade out the text and bar
    tl.to(".loading-content", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    }, "+=0.2");

    // 5. Slide the entire massive black screen UP to reveal the homepage
    tl.to(container.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    });

    // Random floating particles logic inside the loading screen
    gsap.utils.toArray(".particle").forEach((particle: any) => {
      // Set initial random positions to avoid React hydration mismatch
      gsap.set(particle, {
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 20}%`,
        opacity: Math.random() * 0.5 + 0.2
      });

      gsap.to(particle, {
        y: `-${Math.random() * 200 + 100}`,
        x: `${(Math.random() - 0.5) * 100}`,
        opacity: 0,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        delay: Math.random() * 2,
        ease: "power1.out"
      });
    });

  }, { scope: container });

  if (isComplete) return null;

  // Create 30 particles without random styles inline
  const particles = Array.from({ length: 30 }).map((_, i) => (
    <div
      key={i}
      className="particle absolute w-1 h-1 bg-accent-primary rounded-full blur-[1px]"
    />
  ));

  return (
    <div 
      ref={container} 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-accent-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Particles layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles}
      </div>

      <div className="loading-content relative z-10 flex flex-col items-center">
        {/* Animated Logo */}
        <h1 className="loading-text text-white text-3xl md:text-5xl font-black uppercase tracking-[20px] ml-[20px] mb-12 shadow-black drop-shadow-2xl">
          Kirit
        </h1>

        {/* Progress Bar Container */}
        <div className="w-64 md:w-96 h-[2px] bg-white/10 relative overflow-hidden mb-4">
          <div className="progress-fill absolute top-0 left-0 h-full bg-accent-primary shadow-[0_0_10px_rgba(255,45,45,0.8)]" />
        </div>

        {/* Progress Text */}
        <div className="flex justify-between w-64 md:w-96 text-xs font-mono text-gray-500 uppercase tracking-widest">
          <span>Initializing Void</span>
          <span className="progress-number text-accent-primary">0%</span>
        </div>
      </div>
    </div>
  );
}
