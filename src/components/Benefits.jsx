import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  {
    num: "30%",
    animate: true,
    target: 30,
    suffix: "%",
    title: "Reduction in Electricity Cost",
    desc: "Industries on our PPA model see 20–40% savings on electricity bills compared to standard grid tariffs, from day one. No capital risk to you.",
    wide: true,
  },
  {
    num: "Zero",
    animate: false,
    title: "Zero Capital Expenditure",
    desc: "Lumera fully funds, builds, and operates the solar plant. You invest nothing upfront.",
  },
  {
    num: "100%",
    animate: false,
    title: "Tariff Protection",
    desc: "Fixed long-term rate shields you from grid volatility, FPPCA, and fuel surcharges.",
  },
  {
    num: "∞",
    animate: false,
    title: "Reliable Renewable Supply",
    desc: "Consistent clean solar energy so your operations run without power-cost surprises.",
  },
  {
    num: "25+",
    animate: false,
    title: "Years Price Visibility",
    desc: "Long-term energy price predictability for better financial planning.",
  },
];

function BenCard({ card, counterId }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="ben-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: card.wide ? "span 2" : "span 1",
        background: "#fff",
        border: `1px solid ${hov ? "rgba(249,115,22,0.4)" : "#F1F5F9"}`,
        borderRadius: "20px",
        padding: "2.4rem",
        transition: "all 0.38s ease",
        transform: hov ? "translateY(-7px)" : "translateY(0)",
        boxShadow: hov
          ? "0 24px 64px rgba(249,115,22,0.13)"
          : "0 2px 16px rgba(0,0,0,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg,#F97316,#F59E0B)",
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.38s ease",
        }}
      />

      {/* Number */}
      <div
        id={counterId}
        style={{
          fontFamily: "'Barlow Condensed',sans-serif",
          fontSize: "3.4rem",
          fontWeight: 900,
          background: "linear-gradient(135deg,#F97316,#F59E0B)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          marginBottom: "0.45rem",
        }}
      >
        {card.num}
      </div>

      <div
        style={{
          fontSize: "0.98rem",
          fontWeight: 700,
          color: "#0C1220",
          marginBottom: "0.45rem",
        }}
      >
        {card.title}
      </div>
      <div style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.7 }}>
        {card.desc}
      </div>

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          right: "-30px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "rgba(249,115,22,0.05)",
          transition: "all 0.4s",
          transform: hov ? "scale(1.4)" : "scale(1)",
        }}
      />
    </div>
  );
}

export default function Benefits() {
  const sRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ben-header", {
        scrollTrigger: { trigger: ".ben-header", start: "top 82%" },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".ben-card", {
        scrollTrigger: { trigger: ".ben-card", start: "top 85%" },
        opacity: 0,
        y: 45,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
      });

      // Animated counter
      ScrollTrigger.create({
        trigger: "#counter-cost",
        start: "top 80%",
        onEnter: () => {
          gsap.to(
            { v: 0 },
            {
              v: 30,
              duration: 2.4,
              ease: "power2.out",
              onUpdate: function () {
                const el = document.getElementById("counter-cost");
                if (el) el.textContent = Math.round(this.targets()[0].v) + "%";
              },
            }
          );
        },
      });
    }, sRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="benefits"
      ref={sRef}
      style={{
        background:
          "linear-gradient(135deg, #FFFBEB 0%, #FFF7ED 50%, #FFFFFF 100%)",
        padding: "7rem 5rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="ben-header"
          style={{ textAlign: "center", marginBottom: "4.5rem" }}
        >
          <div className="sec-label" style={{ justifyContent: "center" }}>
            What You Gain
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
            Real, Measurable <span className="grad-text">Benefits</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.4rem",
          }}
        >
          {BENEFITS.map((card, i) => (
            <BenCard
              key={i}
              card={card}
              counterId={card.animate ? "counter-cost" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
