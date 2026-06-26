"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer, fadeIn } from "@/animations/variants";
import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";

const links = [
  { name: "NEWSLETTER", active: true },
  { name: "FOLLOW US", active: false },
  { name: "MERCHANDISE", active: false },
  { name: "COLLABORATE", active: false },
];

export default function ConnectPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="relative w-full min-h-screen bg-black pt-32 pb-24 flex flex-col justify-center overflow-hidden">
      
      {/* Animated Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-accent-gold/20 blur-[200px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          variants={staggerContainer} 
          initial="initial" 
          animate="animate"
          className="w-full text-left mb-16"
        >
          <motion.h1 variants={slideUp} className="text-5xl md:text-7xl font-black text-white uppercase tracking-widest mb-2">
            Connect
          </motion.h1>
          <motion.p variants={slideUp} className="text-gray-500 font-mono tracking-[0.3em] uppercase text-xs mb-1">
            Join the Legion
          </motion.p>
          <motion.p variants={slideUp} className="text-gray-500 font-mono tracking-[0.3em] uppercase text-[10px]">
            Be a part of the eternal army.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Link List */}
          <div className="md:col-span-3 flex flex-col gap-6">
            {links.map((link, i) => (
              <motion.button 
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex items-center gap-4 text-left"
              >
                <div className={`w-3 h-3 border ${link.active ? 'bg-white border-white' : 'border-gray-600 group-hover:border-white'} transition-colors`} />
                <span className={`font-black text-xl uppercase tracking-widest ${link.active ? 'text-white' : 'text-gray-600 group-hover:text-gray-300'} transition-colors`}>
                  {link.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Center Column: Huge Glowing Map */}
          <div className="md:col-span-4 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[400px]">
              <div className="absolute inset-0 bg-accent-gold/10 rounded-full blur-[80px] pointer-events-none" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                className="w-full h-full relative"
              >
                <Image 
                  src="/images/backgrounds/universe-map.png"
                  alt="Kirit Universe Core"
                  fill
                  className="object-contain drop-shadow-[0_0_30px_rgba(185,139,66,0.3)] opacity-80"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Newsletter Form */}
          <div className="md:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md mx-auto md:ml-auto md:mr-0"
            >
              <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-8 text-center md:text-left">
                Subscribe to our newsletter
              </h2>

              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-transparent border-b border-gray-600 focus:border-white text-white placeholder-gray-600 py-3 px-2 outline-none font-mono text-sm transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-transparent border-b border-gray-600 focus:border-white text-white placeholder-gray-600 py-3 px-2 outline-none font-mono text-sm transition-colors"
                  />
                </div>

                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-b border-gray-600 focus:border-white text-white placeholder-gray-600 py-3 px-2 outline-none font-mono text-sm transition-colors"
                />

                <div className="flex items-start gap-3 mt-4">
                  <button 
                    type="button"
                    onClick={() => setAgreed(!agreed)}
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center border ${agreed ? 'bg-white border-white' : 'border-gray-600'}`}
                  >
                    {agreed && <Check size={12} className="text-black" />}
                  </button>
                  <label className="text-gray-500 text-[10px] font-mono leading-relaxed cursor-pointer" onClick={() => setAgreed(!agreed)}>
                    By subscribing to our newsletter, you agree to receive emails from Kirit Universe and acknowledge that you've read our Privacy Policy.
                  </label>
                </div>

                <button 
                  type="submit"
                  className="mt-6 px-12 py-4 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors uppercase tracking-[0.2em] text-xs font-mono self-center md:self-start"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </main>
  );
}
