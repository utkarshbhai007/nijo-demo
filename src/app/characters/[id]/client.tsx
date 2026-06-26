"use client";

import { useRef } from "react";
import { Character } from "@/lib/data";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, ChevronLeft, Play } from "lucide-react";

import Image from "next/image";

export function CharacterClient({ character, prev, next }: { character: Character, prev: Character, next: Character }) {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Elegant entrance animations
    const tl = gsap.timeline();
    tl.fromTo(".char-img", 
        { opacity: 0, scale: 1.05, x: -30 }, 
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(".char-header", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 
        "-=0.8"
      )
      .fromTo(".char-quote", 
        { opacity: 0, x: 30 }, 
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 
        "-=0.6"
      )
      .fromTo(".char-story", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 
        "-=0.6"
      )
      .fromTo(".char-stats", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 
        "-=0.4"
      );
  }, { scope: container });

  return (
    <main ref={container} className="relative w-full min-h-screen bg-black pt-28 pb-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent-primary/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-accent-purple/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col min-h-[calc(100vh-120px)]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-grow items-center py-12">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-3 flex flex-col space-y-8">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit char-header mb-8">
              <ChevronLeft size={16} />
              <span className="font-mono uppercase tracking-widest text-xs">All Avataars</span>
            </Link>

            <div className="char-header">
              <span className="text-accent-primary font-mono text-3xl font-bold block mb-2">{character.number}</span>
              <p className="text-gray-400 font-mono tracking-widest uppercase text-xs mb-1">
                {character.element}
              </p>
              <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">
                {character.title}
              </h1>
              <p className="text-gray-500 font-mono tracking-widest uppercase text-xs">
                {character.subtitle}
              </p>
            </div>

            <blockquote className="text-lg font-light text-accent-primary italic char-quote border-l border-accent-primary/30 pl-4">
              {character.quote}
            </blockquote>

            <div className="char-story">
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {character.story}
              </p>
            </div>

            <button className="w-fit flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors char-header">
              <span className="text-xs font-mono uppercase tracking-widest">Watch Trailer</span>
              <Play className="w-3 h-3" />
            </button>
          </div>

          {/* Center Column: Large Artwork */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Previous Navigation Arrow */}
            <Link href={`/characters/${prev.id}`} className="absolute left-0 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors char-header -translate-x-1/2">
              <ChevronLeft size={24} />
            </Link>

            <div className="w-full max-w-lg aspect-square rounded-full overflow-hidden char-img relative mx-auto group">
              {/* Outer Glow matches client design */}
              <div className="absolute inset-0 bg-accent-primary/10 rounded-full blur-[80px] group-hover:bg-accent-primary/20 transition-colors duration-700 pointer-events-none" />
              <Image 
                src={character.image} 
                alt={character.title} 
                fill 
                priority 
                className="object-cover object-center transform scale-110 group-hover:scale-100 transition-transform duration-1000" 
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>

            {/* Next Navigation Arrow */}
            <Link href={`/characters/${next.id}`} className="absolute right-0 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors char-header translate-x-1/2">
              <ArrowRight size={24} />
            </Link>
          </div>

          {/* Right Column: Stats */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-8 pl-0 lg:pl-12 border-l-0 lg:border-l border-white/5">
            
            <div className="char-stats">
              <h3 className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Element</h3>
              <p className="text-sm text-white font-mono uppercase tracking-widest">{character.element}</p>
            </div>

            <div className="char-stats">
              <h3 className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Force</h3>
              <p className="text-sm text-white font-mono uppercase tracking-widest">{character.powers[0] || "Unknown"}</p>
            </div>

            <div className="char-stats">
              <h3 className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Weapon</h3>
              <p className="text-sm text-white font-mono uppercase tracking-widest">{character.weapon}</p>
            </div>

            <div className="char-stats">
              <h3 className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-4">Abilities</h3>
              <ul className="space-y-2">
                {character.abilities.map((ability, index) => (
                  <li key={index} className="text-xs text-gray-400 font-mono uppercase tracking-widest">
                    {ability.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="char-stats pt-4 border-t border-white/5">
              <h3 className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Realm</h3>
              <p className="text-sm text-accent-primary font-mono uppercase tracking-widest">{character.title} Lok</p>
            </div>

          </div>
        </div>

        {/* Bottom Progress Bar area */}
        <div className="w-full flex items-center justify-center py-8 char-header border-t border-white/5 mt-auto">
          <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-gray-500">
            <span className="text-white">{character.number}</span>
            <div className="w-32 h-[1px] bg-white/20">
              <div className="h-full bg-accent-primary w-1/9" /> {/* Visual purely */}
            </div>
            <span>09</span>
          </div>
        </div>

      </div>
    </main>
  );
}
