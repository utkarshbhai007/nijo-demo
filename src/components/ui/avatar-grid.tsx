"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { characters, Character } from "@/lib/data";

function AvatarCard({ avatar }: { avatar: Character }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for the 3D tilt
  const springConfig = { damping: 20, stiffness: 300 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
    setIsHovered(false);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group w-full aspect-square rounded-2xl cursor-pointer"
    >
      <motion.div
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-full relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/5 group-hover:border-white/10 transition-colors duration-500 shadow-2xl"
      >
        <Image
          src={avatar.image}
          alt={avatar.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-110 group-hover:scale-100"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 z-20" />

        {/* Top Content */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-30">
          <span className="text-gray-400 font-mono text-sm tracking-widest">{avatar.number}</span>
          <span className="text-gray-400 font-mono text-xs tracking-[0.2em] uppercase">{avatar.element}</span>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center text-center z-30">
          <span className="text-xs text-gray-500 font-mono tracking-[0.3em] uppercase mb-1">Kirit</span>
          <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest mb-1">
            {avatar.title}
          </h3>
          <span className="text-xs text-gray-400 font-mono tracking-[0.2em] uppercase mb-4">Avataar</span>
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-[1px] bg-accent-primary/50" />
            <p className="text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase">
              The {avatar.subtitle}
            </p>
            <div className="w-4 h-[1px] bg-accent-primary/50" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AvatarGrid() {
  return (
    <section className="relative w-full min-h-screen py-24 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((avatar, index) => (
          <motion.div
            key={avatar.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          >
            <Link href={`/characters/${avatar.id}`} className="block w-full">
              <AvatarCard avatar={avatar} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
