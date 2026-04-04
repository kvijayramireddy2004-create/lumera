import { useRef, useEffect, lazy, Suspense } from "react";
import gsap from "gsap";

const HeroScene = lazy(() => import("../three/HeroScene"));

const S = {
  section: {
    position: "relative",
    height: "100vh",
    minHeight: "680px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  canvas: { position: "absolute", inset: 0, width: "100%", height: "100%" },
  overlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: `
      linear-gradient(115deg,
        rgba(6,10,18,0.88) 0%,
        rgba(6,10,18,0.70) 42%,
        rgba(6,10,18,0.20) 68%,
        rgba(6,10,18,0.00) 100%)
    `,
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "220px",
    pointerEvents: "none",
    background: "linear-gradient(to bottom, transparent, #0A0E16)",
  },
  content: {
    position: "relative",
    zIndex: 5,
    padding: "0 5rem",
    maxWidth: "780px",
    marginTop: "4rem",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.55rem",
    background: "rgba(249,115,22,0.12)",
    border: "1px solid rgba(249,115,22,0.32)",
    color: "#FCD34D",
    padding: "0.38rem 1rem",
    borderRadius: "100px",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: "1.6rem",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    background: "#FCD34D",
    borderRadius: "50%",
    animation: "pulse 2s ease infinite",
  },
  h1: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "clamp(3.4rem, 7.8vw, 6.2rem)",
    fontWeight: 900,
    lineHeight: 0.92,
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
    color: "#FFFFFF",
    marginBottom: "1.5rem",
  },
  sub: {
    fontSize: "1.05rem",
    lineHeight: 1.78,
    maxWidth: "520px",
    color: "rgba(255,255,255,0.65)",
    marginBottom: "2.5rem",
  },
  btns: { display: "flex", gap: "1rem", flexWrap: "wrap" },
  statsRow: {
    position: "absolute",
    bottom: "3.8rem",
    left: "5rem",
    right: "5rem",
    zIndex: 5,
    display: "flex",
    gap: "3.5rem",
  },
  statVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "2.3rem",
    fontWeight: 900,
    lineHeight: 1,
    background: "linear-gradient(135deg, #F97316, #FCD34D)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  statLbl: {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.42)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginTop: "0.2rem",
  },
  scrollHint: {
    position: "absolute",
    bottom: "3.8rem",
    right: "5rem",
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
  },
  scrollLabel: {
    fontSize: "0.65rem",
    color: "rgba(255,255,255,0.32)",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  },
  scrollLine: {
    width: "1px",
    height: "54px",
    background:
      "linear-gradient(to bottom, rgba(249,115,22,0.85), transparent)",
    animation: "scrollDown 2.2s ease infinite",
  },
};

const STATS = [
  { val: "20–40%", lbl: "Cost Reduction" },
  { val: "Zero", lbl: "Upfront Investment" },
  { val: "25+ yrs", lbl: "Price Visibility" },
];

export default function Hero() {
  const contentRef = useRef();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.4)} }
      @keyframes scrollDown {
        0%{transform:scaleY(0);transform-origin:top}
        50%{transform:scaleY(1);transform-origin:top}
        51%{transform:scaleY(1);transform-origin:bottom}
        100%{transform:scaleY(0);transform-origin:bottom}
      }
    `;
    document.head.appendChild(style);

    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.5 })
        .from(".hero-badge", {
          opacity: 0,
          y: 22,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          ".hero-h1",
          { opacity: 0, y: 65, duration: 0.95, ease: "power3.out" },
          "-=0.35"
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: 25, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .from(
          ".hero-btn",
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.14,
            ease: "back.out(1.4)",
          },
          "-=0.4"
        )
        .from(
          ".hero-stat",
          {
            opacity: 0,
            y: 18,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(".scroll-hint", { opacity: 0, duration: 0.6 }, "-=0.2");
    }, contentRef);

    return () => {
      ctx.revert();
      document.head.removeChild(style);
    };
  }, []);

  const goTo = (id) => (e) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" style={S.section}>
      <div style={S.canvas}>
        <Suspense
          fallback={
            <div
              style={{
                background: "linear-gradient(135deg,#0B1120,#1A1A2E)",
                width: "100%",
                height: "100%",
              }}
            />
          }
        >
          <HeroScene />
        </Suspense>
      </div>
      <div style={S.overlay} />
      <div style={S.bottomFade} />

      <div ref={contentRef} style={S.content}>
        <div className="hero-badge" style={S.badge}>
          <span style={S.badgeDot} />
          India's Industrial Solar Partner
        </div>

        <h1 className="hero-h1" style={S.h1}>
          Power Your
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#F97316,#FCD34D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Industry
          </span>
          <br />
          With The Sun
        </h1>

        <p className="hero-sub" style={S.sub}>
          We develop, own, and operate solar power plants — delivering clean
          electricity directly to industrial consumers through long-term Power
          Purchase Agreements.
        </p>

        <div style={S.btns}>
          <a
            href="#contact"
            className="hero-btn btn-white"
            onClick={goTo("#contact")}
          >
            Get Free Energy Audit &nbsp;→
          </a>
          <a
            href="#hiw"
            className="hero-btn btn-outline-white"
            onClick={goTo("#hiw")}
          >
            How It Works &nbsp;↓
          </a>
        </div>
      </div>

      <div style={S.statsRow}>
        {STATS.map((s) => (
          <div key={s.lbl} className="hero-stat">
            <div style={S.statVal}>{s.val}</div>
            <div style={S.statLbl}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="scroll-hint" style={S.scrollHint}>
        <span style={S.scrollLabel}>Scroll</span>
        <div style={S.scrollLine} />
      </div>
    </section>
  );
}
