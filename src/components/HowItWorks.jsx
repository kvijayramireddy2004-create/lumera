const STEPS = [
  {
    num: "01",
    title: "Site Assessment",
    desc: "We analyse your consumption profile, location, and energy needs to design the optimal solar solution for your facility.",
  },
  {
    num: "02",
    title: "Plant Construction",
    desc: "Lumera finances and builds a solar power plant custom-sized for your industrial facility — zero capital from you.",
  },
  {
    num: "03",
    title: "Power Delivery",
    desc: "Clean solar electricity flows to your facility through the grid — reliable, consistent, year-round supply.",
  },
  {
    num: "04",
    title: "PPA Billing",
    desc: "You pay only for power consumed at a fixed, pre-agreed tariff. Simple, predictable, transparent.",
  },
];

export default function HowItWorks() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hiw" className="section section--dark hiw-section">
      <div className="hiw-container">
        {/* ── Header ── */}
        <div className="hiw-header reveal-up">
          <div className="eyebrow eyebrow--light">The Process</div>
          <h2 className="hiw-heading">
            From assessment to power.
            <br />
            <span className="grad-text">Four simple steps.</span>
          </h2>
          <p className="hiw-subtitle">
            A streamlined model that gives your industry clean power with zero
            complexity or capital risk.
          </p>
        </div>

        {/* ── Timeline ── */}
        <div className="hiw-timeline stagger-children">
          {STEPS.map((s) => (
            <div key={s.num} className="hiw-card">
              <div className="hiw-card-inner">
                <h3 className="hiw-card-title">{s.title}</h3>
                <p className="hiw-card-desc">{s.desc}</p>
              </div>
              <span className="hiw-card-watermark" aria-hidden="true">
                {s.num}
              </span>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="hiw-cta reveal-up">
          <a
            href="#contact"
            className="btn-pill btn-orange"
            onClick={scrollTo("#contact")}
          >
            Get Your Free Energy Audit <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <style>{`
        .hiw-section {
          background:
            radial-gradient(ellipse 600px 400px at 85% 10%, rgba(249,115,22,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 500px 350px at 5% 90%, rgba(249,115,22,0.04) 0%, transparent 70%),
            var(--bg-dark);
          overflow: hidden;
        }
        .hiw-container {
          max-width: var(--max-w);
          margin: 0 auto;
        }
        .hiw-header {
          text-align: center;
          max-width: 580px;
          margin: 0 auto 5rem;
        }
        .hiw-heading {
          font-size: clamp(2rem, 4.2vw, 3rem);
          line-height: 1.1;
          color: #fff;
          letter-spacing: -0.03em;
        }
        .hiw-subtitle {
          color: var(--text-white-muted);
          font-size: 0.95rem;
          margin-top: 1.5rem;
          line-height: 1.75;
        }

        /* ── Timeline ── */
        .hiw-timeline {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.2rem;
        }

        /* ── Card ── */
        .hiw-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          padding: 2rem 2.2rem;
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.05) 0%,
              rgba(255, 255, 255, 0.02) 100%
            );
          border: 1px solid rgba(255, 255, 255, 0.07);
          transition: border-color 0.35s ease, background 0.35s ease;
        }
        .hiw-card:hover {
          border-color: rgba(249, 115, 22, 0.2);
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.07) 0%,
              rgba(255, 255, 255, 0.03) 100%
            );
        }
        .hiw-card-inner {
          position: relative;
          z-index: 2;
        }
        .hiw-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.55rem;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .hiw-card-desc {
          font-size: 0.9rem;
          color: var(--text-white-muted);
          line-height: 1.75;
          max-width: 70%;
        }

        /* ── Watermark ── */
        .hiw-card-watermark {
          position: absolute;
          bottom: 0.4rem;
          right: 1.2rem;
          font-family: var(--font-display);
          font-size: clamp(5rem, 9vw, 7rem);
          font-weight: 900;
          color: rgba(255, 255, 255, 0.015);
          line-height: 1;
          letter-spacing: -0.04em;
          pointer-events: none;
          user-select: none;
          z-index: 1;
          transition: color 0.4s ease;
        }
        .hiw-card:hover .hiw-card-watermark {
          color: rgba(249, 115, 22, 0.035);
        }

        /* ── CTA ── */
        .hiw-cta {
          text-align: center;
          margin-top: 5.5rem;
        }

        /* ── Responsive ── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-node { transition: none; }
          .hiw-row:hover .hiw-node { transform: none; }
        }
        @media (max-width: 600px) {
          .hiw-timeline {
            grid-template-columns: 1fr !important;
          }
          .hiw-card {
            padding: 1.6rem 1.3rem;
          }
          .hiw-card-watermark {
            font-size: 3.5rem;
            right: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
}
