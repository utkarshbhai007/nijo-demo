"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer, fadeIn } from "@/animations/variants";
import Image from "next/image";

export default function UniversePage() {
  const stats = [
    { label: "Avataars", value: "9", delay: 0 },
    { label: "Beyond Infinity", value: "∞", delay: 0.2 },
    { label: "Universe", value: "1", delay: 0.4 },
    { label: "Limits", value: "0", delay: 0.6 },
  ];

  return (
    <main className="relative w-full min-h-screen bg-black pt-32 pb-24 overflow-hidden flex flex-col justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-accent-primary/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-accent-gold/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full items-center mb-16">
          
          {/* Left Column: Text Content */}
          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            animate="animate"
            className="flex flex-col items-start"
          >
            <motion.h1 variants={slideUp} className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-2 leading-none">
              The Kirit <br /> Universe
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xs text-gray-500 font-mono tracking-[0.2em] uppercase mb-8">
              A Realm Beyond Time, Space and Mortal Limits
            </motion.p>
            
            <motion.div variants={fadeIn} className="text-sm text-gray-400 font-light leading-relaxed space-y-6 mb-12 max-w-md border-l border-white/10 pl-6">
              <p>
                Born from the void. Bound by cosmic law. The Kirit Universe is where nine eternal forces exist beyond gods, beyond time. Their war shapes destinies. Their power defines existence.
              </p>
              <p>
                This is not a story.<br/>
                This is the beginning of everything.
              </p>
            </motion.div>

            <motion.button variants={slideUp} className="px-8 py-3 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors uppercase tracking-[0.2em] text-xs font-mono">
              Explore The Universe
            </motion.button>
          </motion.div>

          {/* Right Column: Universe Map */}
          <div className="relative w-full aspect-square flex items-center justify-center">
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-full h-full max-w-lg max-h-lg"
            >
              <Image 
                src="/images/backgrounds/universe-map.png"
                alt="The Kirit Universe Map"
                fill
                priority
                className="object-contain drop-shadow-[0_0_50px_rgba(185,139,66,0.3)]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
          
        </div>

        {/* Animated Statistics Section - Client Match */}
        <div className="w-full border-t border-white/10 pt-16 mt-auto">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: stat.delay, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-3 min-w-[120px]"
              >
                <span className="text-4xl md:text-5xl font-light text-white font-mono">{stat.value}</span>
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em]">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
