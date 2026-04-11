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
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          overflow: "hidden",
        }}
      >
        <video
          aria-label="Aerial drone view flight over a solar panel farm"
          autoPlay
          muted
          loop
          playsInline
          poster={heroImg}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/vecteezy_side-view-aerial-drone-view-flight-over-solar-panel-farm_9699478.mp4" type="video/mp4" />
        </video>
      </div>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,14,22,0.95) 0%, rgba(10,14,22,0.5) 40%, rgba(10,14,22,0.2) 100%)",
      }} />

      <div className="hero-content">
        <div className="eyebrow eyebrow--light" style={{ marginBottom: "2rem" }}>
          India's Industrial Solar Partner
        </div>

        <h1 className="hero-heading">
          <span className="hero-heading-sm">Power Your</span>
          <span className="hero-heading-lg">
            <span className="hero-heading-highlight">Industry</span>
          </span>
          <span className="hero-heading-lg">
            <span className="hero-heading-with">With</span>
            <span className="hero-heading-sun">the Sun</span>
          </span>
        </h1>

        <p className="hero-copy">
          We develop, own, and operate solar power plants — delivering clean
          electricity directly to industrial consumers through long-term Power
          Purchase Agreements.
        </p>

        <div className="hero-cta-row">
          <a href="#contact" className="btn-pill btn-orange"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            Get Free Energy Audit <span className="arrow">→</span>
          </a>
          <a href="#about" className="btn-pill btn-outline-w"
            onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}>
            Learn More <span className="arrow">→</span>
          </a>
        </div>
      </div>

      {/* Stats strip */}
      <div className="hero-metrics-shell">
        <div className="hero-metrics-grid">
          {[
            ["20–40%", "Energy cost reduction", "Typical savings versus grid tariff from month one."],
            ["Zero", "Capex required", "We finance, build, own, and maintain the solar plant."],
            ["25+ yrs", "Tariff visibility", "Long-term pricing certainty for procurement planning."],
          ].map(([value, label, note]) => (
            <article key={label} className="hero-metric">
              <div className="hero-metric-value">{value}</div>
              <div className="hero-metric-label">{label}</div>
              <p className="hero-metric-note">{note}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .hero-content {
          position: relative;
          z-index: 2;
          padding: clamp(6.5rem, 12vh, 8rem) var(--section-x) clamp(3.5rem, 8vh, 6rem);
          max-width: 900px;
        }
        .hero-copy {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.7);
          max-width: 540px;
          margin-bottom: 3rem;
        }
        .hero-cta-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero-heading {
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 900;
          line-height: 1.08;
          color: #fff;
          margin-bottom: 2rem;
          letter-spacing: -0.03em;
        }
        .hero-heading-sm {
          display: block;
          font-weight: 400;
          font-style: italic;
          font-size: 0.5em;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.65);
          margin-bottom: 0.1em;
          padding-left: 0.08em;
        }
        .hero-heading-lg {
          display: flex;
          align-items: baseline;
          gap: 0.2em;
        }
        .hero-heading-highlight {
          display: inline-block;
          color: var(--orange);
          background: linear-gradient(135deg, var(--orange), var(--amber));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: italic;
          padding: 0 0.09em 0.08em 0.02em;
          line-height: 1.12;
        }
        .hero-heading-with {
          font-weight: 400;
          font-style: italic;
          font-size: 0.5em;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.02em;
          align-self: center;
        }
        .hero-heading-sun {
          display: inline-block;
          font-style: italic;
          font-weight: 900;
          background: linear-gradient(135deg, var(--orange), var(--amber), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding: 0 0.09em 0.08em 0.02em;
          line-height: 1.12;
        }
        .hero-metrics-shell {
          position: relative;
          z-index: 2;
          padding: clamp(2rem, 3vw, 3rem) var(--section-x) clamp(1.4rem, 2.5vw, 2rem);
          background: linear-gradient(180deg, transparent 0%, rgba(7,10,18,0.7) 40%, rgba(7,10,18,1) 100%);
        }
        .hero-metrics-grid {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(1.2rem, 3vw, 2rem);
        }
        .hero-metric {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.45rem;
          min-height: clamp(112px, 12vw, 136px);
          padding: clamp(1.2rem, 2vw, 1.6rem);
          border-radius: 16px;
          background: linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 8px 24px rgba(0,0,0,0.2);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .hero-metric:hover {
          border-color: rgba(255,255,255,0.15);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.08),
            0 16px 32px rgba(0,0,0,0.28);
        }
        .hero-metric-value {
          font-size: clamp(1.65rem, 2.2vw, 2.1rem);
          font-weight: 800;
          color: var(--orange);
          line-height: 1;
          letter-spacing: -0.02em;
          margin-top: 0.1rem;
          text-shadow: 0 0 24px rgba(249,115,22,0.18);
        }
        .hero-metric-label {
          font-size: 0.84rem;
          color: rgba(255,255,255,0.93);
          line-height: 1.28;
          font-weight: 620;
        }
        .hero-metric-note {
          margin: 0;
          font-size: 0.74rem;
          color: rgba(255,255,255,0.66);
          line-height: 1.5;
          max-width: 35ch;
        }
        @media (prefers-contrast: more) {
          .hero-metric {
            background: rgba(0,0,0,0.92);
          }
          .hero-metric-note, .hero-metric-label { color: #fff; }
        }
        @media (max-width: 980px) {
          .hero-metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .hero-metrics-grid .hero-metric:last-child { grid-column: 1 / -1; }
        }
        @media (max-width: 720px) {
          .hero-metrics-grid { grid-template-columns: 1fr; }
          .hero-metrics-grid .hero-metric:last-child { grid-column: auto; }
          .hero-metric { min-height: auto; }
        }
        @media (max-width: 768px) {
          .hero-content {
            max-width: 100%;
            padding-top: 6.75rem;
            padding-bottom: 2.2rem;
          }
          .hero-heading {
            font-size: clamp(2.25rem, 14vw, 3.2rem);
            line-height: 1.06;
            margin-bottom: 1.35rem;
          }
          .hero-heading-lg {
            gap: 0.14em;
            flex-wrap: wrap;
          }
          .hero-copy {
            font-size: 0.99rem;
            line-height: 1.65;
            margin-bottom: 1.75rem;
            max-width: 36ch;
          }
          .hero-cta-row {
            gap: 0.75rem;
          }
          .hero-cta-row .btn-pill {
            width: auto;
            min-height: 42px;
            padding: 0.28rem 0.32rem 0.28rem 1rem;
            font-size: 0.78rem;
            letter-spacing: 0.01em;
          }
          .hero-cta-row .btn-pill .arrow {
            width: 30px;
            height: 30px;
            margin-left: 0.7rem;
            font-size: 0.9rem;
          }
          .hero-metrics-shell {
            padding-top: 0.75rem;
          }
          .hero-content .eyebrow {
            margin-bottom: 1.15rem !important;
            letter-spacing: 0.16em;
          }
        }
        @media (max-width: 460px) {
          .hero-content {
            padding-top: 6.3rem;
            padding-bottom: 1.8rem;
          }
          .hero-heading {
            font-size: clamp(2.1rem, 12.4vw, 2.7rem);
          }
          .hero-heading-sm, .hero-heading-with {
            font-size: 0.46em;
          }
          .hero-copy {
            font-size: 0.95rem;
          }
          .hero-cta-row .btn-pill {
            font-size: 0.74rem;
            min-height: 40px;
            padding-left: 0.9rem;
          }
          .hero-cta-row .btn-pill .arrow {
            width: 28px;
            height: 28px;
            margin-left: 0.62rem;
            font-size: 0.82rem;
          }
          .hero-metric-value { font-size: 1.7rem; }
          .hero-metric-label { font-size: 0.86rem; }
          .hero-metric-note { font-size: 0.74rem; }
        }
        @media (prefers-contrast: more) {
          .hero-heading-sun {
            background: none;
            -webkit-text-fill-color: currentColor;
            color: var(--orange-dark);
          }
        }
        @media (prefers-contrast: more) {
          .hero-heading-highlight {
            background: none;
            -webkit-text-fill-color: currentColor;
            color: var(--orange-dark);
          }
        }
      `}</style>
    </section>
  );
}
