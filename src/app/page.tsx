"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { slideUp, staggerContainer, fadeIn } from "@/animations/variants";
import Image from "next/image";

const AvatarGrid = dynamic(() => import("@/components/ui/avatar-grid").then(mod => mod.AvatarGrid), { ssr: false });
import { MagneticWrapper } from "@/components/animations/magnetic-wrapper";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center pt-20">
        
        {/* Background Image: The Planet */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/backgrounds/hero-planet.png"
            alt="Kirit Universe Planet"
            fill
            priority
            className="object-cover object-top opacity-80 mix-blend-lighten"
            sizes="100vw"
          />
          {/* Subtle gradient overlays to blend the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        {/* Overlay Content */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="relative z-10 flex flex-col items-center text-center mt-[-10vh]"
        >
          {/* Top small text */}
          <motion.p 
            variants={slideUp}
            className="text-gray-500 font-mono tracking-[0.4em] text-[10px] md:text-xs uppercase mb-8"
          >
            9 FORCES . 9 AVATAARS . 1 UNIVERSE
          </motion.p>
          
          {/* Massive Title Block */}
          <motion.div variants={slideUp} className="flex flex-col items-center mb-6">
            <h1 className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-black tracking-widest text-white leading-none drop-shadow-2xl">
              K<span className="text-accent-primary relative inline-block">I<span className="absolute inset-0 bg-accent-primary/20 blur-md rounded-full" /></span>RIT
            </h1>
            <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-light uppercase tracking-[0.6em] md:tracking-[0.8em] pl-4 md:pl-8 mt-4 md:mt-2">
              UNIVERSE
            </div>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={fadeIn}
            className="text-[10px] md:text-xs text-gray-400 font-mono tracking-[0.3em] uppercase mb-12"
          >
            BEYOND GODS. BEYOND TIME.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div variants={slideUp}>
            <MagneticWrapper strength={0.4}>
              <button className="group px-8 md:px-10 py-3 md:py-4 border border-white/20 rounded-full hover:bg-white/5 transition-all uppercase tracking-[0.2em] text-[10px] md:text-xs font-mono backdrop-blur-sm">
                <span className="text-accent-primary font-bold group-hover:text-accent-primary/80 transition-colors">ENTER</span>{" "}
                <span className="text-white group-hover:text-gray-200 transition-colors">THE UNIVERSE</span>
              </button>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
        
        {/* Absolute Side Annotations */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-start font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase z-20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 bg-accent-primary shadow-[0_0_8px_rgba(255,45,45,0.8)]" />
            <span className="text-white font-bold tracking-widest">MANGAL</span>
          </div>
          <p className="text-gray-500">THE RED PLANET</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase z-20"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-white font-bold tracking-widest flex items-center gap-2">
              EST. <span className="text-sm leading-none mt-[1px]">∞</span>
            </span>
            <div className="w-1.5 h-1.5 bg-accent-primary shadow-[0_0_8px_rgba(255,45,45,0.8)]" />
          </div>
          <p className="text-gray-500">BEYOND INFINITY</p>
        </motion.div>
      </div>
      
      {/* Avatar Grid Section */}
      <div className="relative z-20 bg-secondary-bg min-h-screen">
        <AvatarGrid />
      </div>
    </main>
  );
}
