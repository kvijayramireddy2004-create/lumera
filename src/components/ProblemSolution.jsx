import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROBLEMS = [
  "High base energy tariff from grid utilities",
  "Fuel & Power Purchase Cost Adjustment (FPPCA)",
  "Recurring fuel surcharge adjustments",
  "Unpredictable periodic tariff revisions",
];

const SOLUTIONS = [
  {
    icon: "🎁",
    title: "Zero Upfront Cost",
    desc: "No capital expenditure. We invest, build, and own the solar plant. You pay only for power consumed.",
  },
  {
    icon: "📉",
    title: "Lower Electricity Cost",
    desc: "Save 20–40% vs your current grid tariff starting from day one of supply.",
  },
  {
    icon: "🛡️",
    title: "Predictable Long-Term Tariff",
    desc: "Fixed locked-in rate protects your margins from market and policy volatility.",
  },
  {
    icon: "🌿",
    title: "Clean Renewable Supply",
    desc: "100% solar power. Strengthen your ESG credentials and sustainability goals.",
  },
];

function SolCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="sol-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#FFFBEB" : "#fff",
        border: `1px solid ${hov ? "#F97316" : "#FED7AA"}`,
        borderRadius: "16px",
        padding: "1.8rem",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov
          ? "0 16px 48px rgba(249,115,22,0.14)"
          : "0 2px 12px rgba(0,0,0,0.05)",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "13px",
          background: "linear-gradient(135deg,#F97316,#EA580C)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          marginBottom: "1rem",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontFamily: "'Barlow Condensed',sans-serif",
          fontSize: "1.05rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "#0C1220",
          marginBottom: "0.4rem",
        }}
      >
        {title}
      </div>

      <div style={{ fontSize: "0.83rem", color: "#64748B", lineHeight: 1.65 }}>
        {desc}
      </div>
    </div>
  );
}

export default function ProblemSolution() {
  const sRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".ps-header", {
        scrollTrigger: {
          trigger: ".ps-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      // Problem card animation
      gsap.from(".prob-card", {
        scrollTrigger: {
          trigger: ".prob-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -55,
        duration: 0.9,
        ease: "power3.out",
      });

      // ✅ FIXED: Each solution card gets its own trigger
      gsap.utils.toArray(".sol-card").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: "power3.out",
        });
      });
    }, sRef);

    // Refresh ScrollTrigger after mount
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="solution"
      ref={sRef}
      style={{
        background: "#FFF7ED",
        padding: "7rem 5rem",
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="ps-header"
          style={{ textAlign: "center", marginBottom: "4.5rem" }}
        >
          <div className="sec-label" style={{ justifyContent: "center" }}>
            The Challenge &amp; Our Answer
          </div>

          <h2
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: "clamp(2.4rem,4.5vw,3.6rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 0.95,
            }}
          >
            Why Bills Keep Rising —{" "}
            <span className="grad-text">And Our Fix</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5rem",
          }}
        >
          {/* Problem Card */}
          <div
            className="prob-card"
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "2.5rem",
              boxShadow: "0 4px 28px rgba(0,0,0,0.07)",
              border: "1px solid #FED7AA",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.6rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>⚡</span>

              <h3
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Why Your Bills Keep Rising
              </h3>
            </div>

            {PROBLEMS.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  padding: "0.72rem 0",
                  borderBottom:
                    i < PROBLEMS.length - 1 ? "1px solid #FEF3E2" : "none",
                }}
              >
                <span style={{ color: "#EF4444", fontWeight: 700 }}>↑</span>
                {p}
              </div>
            ))}
          </div>

          {/* Solutions */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.15rem",
            }}
          >
            {SOLUTIONS.map((s, i) => (
              <SolCard key={i} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
