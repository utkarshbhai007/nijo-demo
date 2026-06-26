"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { slideUp, staggerContainer, fadeIn } from "@/animations/variants";
import Image from "next/image";

interface VideoData {
  id: string;
  title: string;
  image: string;
  duration: string;
  category: string;
}

const videos: VideoData[] = [
  { id: "v1", title: "KIRIT UNIVERSE OFFICIAL TRAILER", image: "/images/backgrounds/media-poster.png", duration: "2:45", category: "Trailer" },
  { id: "v2", title: "Behind The Scenes: Worldbuilding", image: "https://picsum.photos/seed/kirit-media2/1920/1080", duration: "4:12", category: "Featurette" },
  { id: "v3", title: "Character Reveal: Kaal", image: "https://picsum.photos/seed/kirit-media3/1920/1080", duration: "1:30", category: "Character" },
  { id: "v4", title: "Combat Mechanics Deep Dive", image: "https://picsum.photos/seed/kirit-media4/1920/1080", duration: "5:20", category: "Gameplay" },
  { id: "v5", title: "Original Soundtrack Preview", image: "https://picsum.photos/seed/kirit-media5/1920/1080", duration: "3:05", category: "Audio" },
];

export default function MediaPage() {
  const [activeVideo, setActiveVideo] = useState<VideoData | null>(null);
  const featuredVideo = videos[0];

  return (
    <main className="relative w-full min-h-screen bg-black pt-32 pb-24 overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-accent-primary/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-10">
        
        {/* Header */}
        <motion.div 
          variants={staggerContainer} 
          initial="initial" 
          animate="animate"
          className="text-left w-full"
        >
          <motion.h1 variants={slideUp} className="text-5xl md:text-7xl font-black text-white uppercase tracking-widest mb-2">
            Media
          </motion.h1>
          <motion.p variants={slideUp} className="text-gray-500 font-mono tracking-[0.3em] uppercase text-xs">
            Vesteers. Not followers.
          </motion.p>
        </motion.div>

        {/* Large Featured Trailer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div
            className="relative w-full aspect-video rounded-t-2xl overflow-hidden cursor-pointer group bg-black"
            onClick={() => setActiveVideo(featuredVideo)}
          >
            <Image 
              src={featuredVideo.image} 
              alt={featuredVideo.title} 
              fill
              priority
              className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
          
            {/* Animated Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent-gold/20 group-hover:border-accent-gold transition-all duration-500">
                <Play className="text-white ml-2 w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110" fill="currentColor" />
              </div>
            </div>
          </div>
          
          {/* Banner Bar Below Video */}
          <div className="w-full flex items-center justify-between border border-white/10 border-t-0 rounded-b-2xl px-6 py-4 bg-[#0a0a0a]">
            <h2 className="text-sm md:text-base font-bold text-white tracking-widest uppercase">
              {featuredVideo.title}
            </h2>
            <span className="text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase">
              Kirit Universe
            </span>
          </div>
        </motion.div>

        {/* Thumbnail Slider */}
        <div className="w-full mt-8">
          <div className="flex overflow-x-auto gap-4 pb-8 hide-scrollbar">
            {videos.slice(1).map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex-none w-[280px] aspect-video rounded-lg overflow-hidden border border-white/5 group cursor-pointer"
                onClick={() => setActiveVideo(video)}
              >
                <Image 
                  src={video.image} 
                  alt={video.title} 
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                
                {/* Mini Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <Play className="text-white ml-1 w-4 h-4" fill="currentColor" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 pt-8">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
                    {video.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-accent-gold hover:border-accent-gold transition-colors z-50"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src={activeVideo.image} alt="Playing" fill className="object-cover opacity-50" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="text-center z-10">
                  <Play className="w-20 h-20 text-white/50 mx-auto mb-4" />
                  <p className="text-white font-mono tracking-widest uppercase text-sm">Playing: {activeVideo.title}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
