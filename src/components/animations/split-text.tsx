"use client";

import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  type?: "words" | "chars";
  delay?: number;
  stagger?: number;
}

export function SplitText({ text, className = "", type = "chars", delay = 0, stagger = 0.05 }: SplitTextProps) {
  const container = useRef<HTMLDivElement>(null);

  const elements = useMemo(() => {
    if (type === "words") {
      return text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="split-element inline-block opacity-0 translate-y-[100%]">{word}</span>
        </span>
      ));
    }
    return text.split("").map((char, i) => {
      if (char === " ") return <span key={i} className="inline-block w-[0.25em]">&nbsp;</span>;
      return (
        <span key={i} className="inline-block overflow-hidden">
          <span className="split-element inline-block opacity-0 translate-y-[100%]">{char}</span>
        </span>
      );
    });
  }, [text, type]);

  useGSAP(() => {
    if (!container.current) return;

    gsap.to(container.current.querySelectorAll(".split-element"), {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      stagger: stagger,
      delay: delay,
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }, { scope: container, dependencies: [elements] });

  return (
    <div ref={container} className={`flex flex-wrap ${className}`}>
      {elements}
    </div>
  );
}
