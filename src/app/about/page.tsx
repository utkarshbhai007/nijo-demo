"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideUp, fadeIn } from "@/animations/variants";
import Image from "next/image";
import { cn } from "@/lib/utils";

const loreData = [
  {
    id: "origins",
    number: "01",
    navTitle: "ORIGINS",
    title: "ORIGINS",
    subtitle: "THE BIRTH OF THE COSMOS",
    description: "Before time itself was measured, there was only the Void. A silent expanse of infinite potential. The Architects, beings of pure light and thought, wove the first strands of reality, bringing forth the Core Worlds and establishing the delicate balance that would govern the Kirit Universe for eons to come. But balance is fragile, and the light always casts a shadow.",
    image: "/images/backgrounds/lore-origins.png",
  },
  {
    id: "first-war",
    number: "02",
    navTitle: "THE FIRST WAR",
    title: "THE FIRST WAR",
    subtitle: "SHATTERED PEACE",
    description: "The Great Fracture tore the Core Worlds apart. As ambitious mortals reached too far, the fabric of space-time destabilized. The resulting catastrophe unleashed raw cosmic energies, dividing the universe and setting the stage for the Eternal War.",
    image: "/images/backgrounds/lore-war.png",
  },
  {
    id: "nine-forces",
    number: "03",
    navTitle: "THE NINE FORCES",
    title: "THE NINE FORCES",
    subtitle: "COSMIC MANIFESTATIONS",
    description: "From the ashes of the Fracture emerged the Nine. Not gods, but the raw manifestations of universal laws—Time, Death, Gravity, Darkness, Energy, Mind, Fire, Illusion, and Earth. They are the Avataars, bound to maintain the precarious equilibrium.",
    image: "/images/backgrounds/universe-map.png",
  },
  {
    id: "divine-codex",
    number: "04",
    navTitle: "THE DIVINE CODEX",
    title: "THE DIVINE CODEX",
    subtitle: "ANCIENT LAWS",
    description: "Written in the language of the stars, the Codex dictates the laws of existence. It is said that whoever can decipher its true meaning holds the power to remake the Kirit Universe entirely.",
    image: "/images/backgrounds/lore-crown.png",
  },
  {
    id: "prophecy",
    number: "05",
    navTitle: "THE PROPHECY",
    title: "THE PROPHECY",
    subtitle: "THE FINAL SILENCE",
    description: "A whisper echoes through the Outer Rim: a time will come when the Nine must unite or perish. The Prophecy speaks of a final convergence, where all light will fade, and a new genesis will begin.",
    image: "/images/backgrounds/hero-bg.png",
  }
];

export default function LorePage() {
  const [activeTab, setActiveTab] = useState(loreData[0].id);
  const activeLore = loreData.find((lore) => lore.id === activeTab) || loreData[0];

  return (
    <main className="relative w-full min-h-screen bg-black pt-32 pb-24 overflow-hidden flex flex-col justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent-gold/20 blur-[200px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 w-full items-center">
          
          {/* Left Column: Navigation */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest mb-2">LORE</h1>
              <p className="text-[10px] text-gray-500 font-mono tracking-[0.3em] uppercase">The Truth Beyond Legends</p>
            </div>

            <nav className="flex flex-col gap-6">
              {loreData.map((lore) => {
                const isActive = activeTab === lore.id;
                return (
                  <button
                    key={lore.id}
                    onClick={() => setActiveTab(lore.id)}
                    className="group flex items-center gap-4 text-left transition-all duration-300"
                  >
                    <span className={cn(
                      "font-mono text-xs tracking-widest transition-colors",
                      isActive ? "text-accent-gold" : "text-gray-600 group-hover:text-gray-400"
                    )}>
                      {lore.number}
                    </span>
                    <span className={cn(
                      "font-black text-xl uppercase tracking-widest transition-colors",
                      isActive ? "text-white" : "text-gray-600 group-hover:text-gray-300"
                    )}>
                      {lore.navTitle}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Center Column: Large Image */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/5] max-w-lg mx-auto">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLore.id}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src={activeLore.image as string}
                    alt={activeLore.title}
                    fill
                    priority
                    className="object-cover rounded-2xl drop-shadow-[0_0_30px_rgba(185,139,66,0.2)]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLore.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col"
              >
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest mb-2">
                  {activeLore.title}
                </h2>
                <h3 className="text-xs text-accent-gold font-mono tracking-[0.2em] uppercase mb-8">
                  {activeLore.subtitle}
                </h3>
                
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-10 text-justify">
                  {activeLore.description}
                </p>

                <button className="w-fit px-8 py-3 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors uppercase tracking-[0.2em] text-[10px] font-mono">
                  Read More
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  );
}
