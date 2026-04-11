import heroImg from "../assets/solar-hero.png";

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "#0a0e16",
      }}
    >
      <div
        role="img"
        aria-label="Solar panels powering industrial facilities at sunrise"
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,14,22,0.95) 0%, rgba(10,14,22,0.5) 40%, rgba(10,14,22,0.2) 100%)",
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        padding: "0 var(--section-x) 6rem",
        maxWidth: "900px",
      }}>
        <div className="eyebrow eyebrow--light" style={{ marginBottom: "2rem" }}>
          India's Industrial Solar Partner
        </div>

        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 900, lineHeight: 0.9,
          color: "#fff", marginBottom: "2rem",
        }}>
          Power Your{" "}
          <span className="grad-text">Industry</span>
          <br />With the Sun
        </h1>

        <p style={{
          fontSize: "1.1rem", lineHeight: 1.8,
          color: "rgba(255,255,255,0.7)",
          maxWidth: "540px", marginBottom: "3rem",
        }}>
          We develop, own, and operate solar power plants — delivering clean
          electricity directly to industrial consumers through long-term Power
          Purchase Agreements.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="#contact" className="btn btn--primary"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            Get Free Energy Audit
          </a>
          <a href="#about" className="btn btn--outline-white"
            onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}>
            Learn More
          </a>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        position: "relative", zIndex: 2,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
      }}>
        {[
          ["20–40%", "Cost Reduction"],
          ["Zero", "Upfront Investment"],
          ["25+ yrs", "Price Visibility"],
        ].map(([val, label]) => (
          <div key={label} style={{
            padding: "2rem var(--section-x)",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,3vw,2.4rem)",
              fontWeight: 900, color: "var(--orange)", marginBottom: "0.3rem",
            }}>{val}</div>
            <div style={{
              fontSize: "0.72rem", color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600,
            }}>{label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          #home > div:last-child { grid-template-columns: 1fr !important; }
          #home > div:last-child > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.1); }
        }
      `}</style>
    </section>
  );
}
