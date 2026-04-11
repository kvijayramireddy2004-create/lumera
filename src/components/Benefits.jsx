import { useRef, useState, useEffect } from "react";
import useScrollAnimations from "../hooks/useScrollAnimations";
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
    desc: "Industries on our PPA model see 20–40% savings...",
    wide: true,
  },
  {
    num: "Zero",
    animate: false,
    title: "Zero Capital Expenditure",
    desc: "Lumera fully funds, builds, and operates...",
  },
  {
    num: "100%",
    animate: false,
    title: "Tariff Protection",
    desc: "Fixed long-term rate shields you...",
  },
  {
    num: "∞",
    animate: false,
    title: "Reliable Renewable Supply",
    desc: "Consistent clean solar energy...",
  },
  {
    num: "25+",
    animate: false,
    title: "Years Price Visibility",
    desc: "Long-term energy price predictability...",
  },
];

function BenCard({ card }) {
  const [hov, setHov] = useState(false);
  const counterRef = useRef();

  useEffect(() => {
    if (!card.animate) return;

    const el = counterRef.current;
    const obj = { val: 0 };

    gsap.to(obj, {
      val: card.target,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (el) {
          el.innerText = Math.floor(obj.val) + card.suffix;
        }
      },
    });
  }, [card]);

  return (
    <div
      className={`ben-card reveal-card${card.wide ? " ben-card-wide" : ""}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: card.wide ? "span 2" : "span 1",
        background: "#fff",
        border: "1px solid #F1F5F9",
        borderRadius: "20px",
        padding: "2.4rem",
        transition: "transform 0.3s ease",
        transform: hov
          ? "translateY(-6px) scale(1.02)"
          : "translateY(0) scale(1)",
        willChange: "transform, opacity",
        contain: "layout paint",
        position: "relative", // 🔥 required for line
        overflow: "hidden", // 🔥 required for line
      }}
    >
      {/* Number */}
      <div
        ref={counterRef}
        style={{
          fontFamily: "'Barlow Condensed',sans-serif",
          fontSize: "3.4rem",
          fontWeight: 900,
          background: "linear-gradient(135deg,#F97316,#F59E0B)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "0.4rem",
        }}
      >
        {card.animate ? "0%" : card.num}
      </div>

      <h3 style={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.3 }}>{card.title}</h3>

      <p style={{ fontSize: "0.85rem", color: "#64748B" }}>{card.desc}</p>
    </div>
  );
}

export default function Benefits() {
  const ref = useRef();
  useScrollAnimations(ref);

  return (
    <section
      ref={ref}
      id="benefits"
      className="section-py"
      style={{
        background: "linear-gradient(135deg,#FFFBEB,#FFF7ED,#FFFFFF)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="reveal-up"
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "1.2rem",
          }}
        >
          <h2>
            Real, Measurable <span className="grad-text">Benefits</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          className="ben-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1.4rem",
          }}
        >
          {BENEFITS.map((card, i) => (
            <BenCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
