import { useLayoutEffect, useEffect } from "react";

/**
 * useIsomorphicLayoutEffect
 * 
 * Safely use useLayoutEffect on the server (which avoids SSR warnings)
 * and the client. Extremely useful for GSAP and Framer Motion setups.
 */
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
