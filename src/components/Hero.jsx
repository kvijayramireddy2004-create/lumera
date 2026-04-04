import { useRef, useEffect } from "react";
import heroImg from "../assets/solar-hero.png";
import gsap from "gsap";

export default function Hero() {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-badge", { opacity: 0, y: 20 })
        .from(".hero-title", { opacity: 0, y: 60 }, "-=0.3")
        .from(".hero-sub", { opacity: 0, y: 25 }, "-=0.4")
        .from(".hero-btn", { opacity: 0, y: 20, stagger: 0.12 }, "-=0.4")
        .from(".hero-stat", { opacity: 0, y: 15, stagger: 0.1 }, "-=0.3");
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "#0A0E16",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `
  linear-gradient(
    115deg,
    rgba(8,12,20,0.75) 0%,
    rgba(10,15,25,0.55) 30%,
    rgba(10,15,25,0.25) 55%,
    rgba(10,15,25,0.08) 75%,
    rgba(10,15,25,0) 100%
  )
`,
        }}
      />

      {/* ☀️ SUN GLOW OVERLAY (VERY IMPORTANT) */}
      <div
        style={{
          position: "absolute",
          right: "15%",
          top: "20%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(255,200,120,0.35), transparent 70%)",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      />

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          height: "240px",
          width: "100%",
          background: "linear-gradient(to bottom, transparent, #0A0E16)",
          zIndex: 1,
        }}
      />

      {/* CONTENT */}
      <div
        ref={ref}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "5rem",
          maxWidth: "720px",
          marginTop: "2.5rem",
        }}
      >
        {/* Badge */}
        <div
          className="hero-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(249,115,22,0.12)",
            border: "1px solid rgba(249,115,22,0.35)",
            color: "#FCD34D",
            padding: "0.4rem 1rem",
            borderRadius: "999px",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          ● INDIA’S INDUSTRIAL SOLAR PARTNER
        </div>

        {/* Title */}
        <h1
          className="hero-title"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(3.5rem, 7vw, 6rem)",
            fontWeight: 900,
            lineHeight: 0.92,
            textTransform: "uppercase",
            color: "#FFFFFF",
            marginBottom: "1.2rem",
          }}
        >
          POWER YOUR <br />
          <span
            style={{
              background: "linear-gradient(135deg,#F97316,#FCD34D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            INDUSTRY
          </span>
          <br />
          WITH THE SUN
        </h1>

        {/* Subtitle */}
        <p
          className="hero-sub"
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.7)",
            marginBottom: "2rem",
            maxWidth: "520px",
          }}
        >
          We develop, own, and operate solar power plants — delivering clean
          electricity directly to industrial consumers through long-term Power
          Purchase Agreements.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          position: "absolute",
          bottom: "3.5rem",
          left: "5rem",
          display: "flex",
          gap: "3rem",
          zIndex: 2,
        }}
      >
        {[
          ["20–40%", "Cost Reduction"],
          ["Zero", "Upfront Investment"],
          ["25+ yrs", "Price Visibility"],
        ].map(([val, label]) => (
          <div key={label} className="hero-stat">
            <div
              style={{
                fontSize: "2.2rem",
                fontWeight: 900,
                background: "linear-gradient(135deg,#F97316,#FCD34D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {val}
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
