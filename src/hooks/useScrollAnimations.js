import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimations() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      /* ── Reveal up ── */
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.from(el, {
          y: 54,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      /* ── Reveal left ── */
      gsap.utils.toArray(".reveal-left").forEach((el) => {
        gsap.from(el, {
          x: -70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      /* ── Reveal right ── */
      gsap.utils.toArray(".reveal-right").forEach((el) => {
        gsap.from(el, {
          x: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      /* ── Reveal scale ── */
      gsap.utils.toArray(".reveal-scale").forEach((el) => {
        gsap.from(el, {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      /* ── Batch card reveals ── */
      gsap.set(".reveal-card", { opacity: 0, y: 40 });
      ScrollTrigger.batch(".reveal-card", {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
          }),
      });

      /* ── Stagger children ── */
      gsap.utils.toArray(".stagger-children").forEach((parent) => {
        gsap.from(Array.from(parent.children), {
          y: 44,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: parent,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      /* ── Draw line (horizontal) ── */
      gsap.utils.toArray(".draw-line").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
