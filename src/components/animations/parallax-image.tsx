"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  speed?: number; // 0 to 1, higher is faster parallax
}

import Image from "next/image";

export function ParallaxImage({ src, alt, className = "", imageClassName = "", speed = 0.5 }: ParallaxImageProps) {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!container.current || !imageRef.current) return;

    // Set initial scale to allow for parallax room without showing edges
    gsap.set(imageRef.current, { scale: 1 + speed, yPercent: -speed * 50 });

    gsap.to(imageRef.current, {
      yPercent: speed * 50,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom", // when the top of the container hits the bottom of the viewport
        end: "bottom top",   // when the bottom of the container hits the top of the viewport
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className={`relative overflow-hidden ${className}`}>
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        className={`object-cover origin-center ${imageClassName}`}
      />
    </div>
  );
}
