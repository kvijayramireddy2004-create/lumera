import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimations(ref) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headers
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Batched cards (🔥 key optimization)
      ScrollTrigger.batch(".reveal-card", {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: 40,
            stagger: 0.12,
            duration: 0.6,
            ease: "power3.out",
          }),
      });
    }, ref);

    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    return () => ctx.revert();
  }, [ref]);
}
