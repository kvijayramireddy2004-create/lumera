import { useRef, useState } from "react";
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

  return (
    <div
      className="ben-card reveal-card"
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
      }}
    >
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
        {card.num}
      </div>

      <div style={{ fontWeight: 700 }}>{card.title}</div>
      <div style={{ fontSize: "0.85rem", color: "#64748B" }}>{card.desc}</div>
    </div>
  );
}

export default function Benefits() {
  const ref = useRef();
  useScrollAnimations(ref);

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(135deg,#FFFBEB,#FFF7ED,#FFFFFF)",
        padding: "7rem 5rem",
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
