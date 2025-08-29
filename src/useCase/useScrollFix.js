// src/hooks/useScrollFix.js
import { useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from '@Src/utils/gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const useScrollFix = (smoothScrollRef, scrollPosition) => {
    return useCallback(() => {
        // Kill all existing ScrollTriggers
        if (ScrollTrigger) {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }

        // Refresh the smoother instance if it exists
        if (ScrollSmoother.get()) {
            smoothScrollRef?.current?.refresh();
        }

        // Restore the scroll position
        smoothScrollRef?.current?.scrollTop(scrollPosition);
    }, [smoothScrollRef, scrollPosition]);
};
