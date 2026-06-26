"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaTwitter, FaDiscord, FaYoutube, FaTwitch } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Lore", href: "/about" },
  { name: "Universe", href: "/universe" },
  { name: "Media", href: "/media" },
  { name: "Connect", href: "/connect" },
];

const socialLinks = [
  { name: "Twitter", icon: FaTwitter, href: "#" },
  { name: "Discord", icon: FaDiscord, href: "#" },
  { name: "YouTube", icon: FaYoutube, href: "#" },
  { name: "Twitch", icon: FaTwitch, href: "#" },
];

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-black pt-32 pb-8 mt-auto border-t border-white/5">
      
      {/* Huge Background Planet Curve */}
      <div className="absolute left-1/2 bottom-0 w-[150vw] md:w-[120vw] aspect-[2/1] -translate-x-1/2 translate-y-1/2 rounded-[100%] bg-secondary-bg border-t border-white/10 shadow-[0_-50px_100px_rgba(255,45,45,0.05)] pointer-events-none z-0">
        <div className="absolute inset-0 rounded-[100%] border-t border-accent-primary/20 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-[100%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="inline-block group">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase group-hover:text-gradient-purple transition-all duration-500">
                Kirit
              </h2>
              <span className="block text-xs text-accent-primary font-mono tracking-[0.3em] uppercase mt-1">
                Universe
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-gray-400 hover:text-white font-mono text-sm tracking-widest uppercase transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a 
                  key={social.name} 
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent-primary hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Animated Separator */}
        <div className="relative w-full h-[1px] bg-white/10 mb-8 overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            viewport={{ once: false }}
            className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-accent-primary to-transparent"
          />
        </div>

        {/* Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600 tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Kirit Universe. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
