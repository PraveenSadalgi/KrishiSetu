import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScrollContext = createContext();

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
  }
  return context;
};

export const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with optimized performance settings
    lenisRef.current = new Lenis({
      duration: 0.8, // Reduced from 1.2 for snappier feel
      easing: (t) => t, // Simplified linear easing for better performance
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8, // Slightly reduced for smoother feel
      smoothTouch: false,
      touchMultiplier: 1.5, // Reduced from 2 for better touch performance
      infinite: false,
      // Add performance optimizations
      lerp: 0.1, // Smooth interpolation value
      wheelMultiplier: 0.8,
    });

    // Start the animation loop with performance monitoring
    let rafId;
    const raf = (time) => {
      lenisRef.current?.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenisRef.current?.destroy();
    };
  }, []);

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, { immediate: false });
  };

  const scrollTo = (target, options = {}) => {
    lenisRef.current?.scrollTo(target, options);
  };

  const value = {
    lenis: lenisRef.current,
    scrollToTop,
    scrollTo,
  };

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
