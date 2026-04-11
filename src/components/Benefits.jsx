const BENEFITS = [
  { num: "20–40%", title: "Reduction in Electricity Cost", desc: "Industries on our PPA model see 20–40% savings from day one.", wide: true },
  { num: "Zero", title: "Capital Expenditure", desc: "Lumera fully funds, builds, and operates the solar plant." },
  { num: "100%", title: "Tariff Protection", desc: "Fixed long-term rate shields you from market volatility." },
  { num: "∞", title: "Reliable Renewable Supply", desc: "Consistent clean solar energy for your operations." },
  { num: "25+", title: "Years Price Visibility", desc: "Long-term energy price predictability for your business." },
];

export default function Benefits() {
  return (
    <section id="benefits" className="section ben-section">
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="eyebrow" style={{ color: "var(--text-light)" }}>Why Choose Lumera</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}>
            Real, Measurable <span className="grad-text">Benefits</span>
          </h2>
        </div>

        <div className="ben-grid">
          {BENEFITS.map((b, i) => (
            <div key={i} className={`ben-card ${b.wide ? "ben-card-wide" : ""}`}>
              <div className="ben-card-num">{b.num}</div>
              <h3 className="ben-card-title">{b.title}</h3>
              <p className="ben-card-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ben-section {
          background:
            radial-gradient(1200px 600px at 8% -18%, rgba(255, 255, 255, 0.95) 0%, transparent 62%),
            radial-gradient(900px 460px at 96% -8%, rgba(249, 115, 22, 0.15) 0%, transparent 62%),
            linear-gradient(180deg, #f5f5f8 0%, #eff0f4 100%);
        }

        .ben-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.35rem;
          align-items: stretch;
          perspective: 1200px;
        }

        .ben-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          border-radius: 26px;
          min-height: 188px;
          padding: 2.2rem;
          background:
            linear-gradient(140deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.5) 100%),
            linear-gradient(120deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 52%);
          backdrop-filter: blur(26px) saturate(185%);
          -webkit-backdrop-filter: blur(26px) saturate(185%);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow:
            0 20px 44px rgba(17, 17, 17, 0.08),
            0 3px 8px rgba(17, 17, 17, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.98),
            inset 0 -1px 0 rgba(255, 255, 255, 0.48);
          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
          transform-style: preserve-3d;
          cursor: default;
        }
        .ben-card > * {
          position: relative;
          z-index: 2;
        }
        .ben-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 54%;
          border-radius: 24px 24px 0 0;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.86) 0%,
            rgba(255, 255, 255, 0.34) 52%,
            transparent 100%
          );
          pointer-events: none;
        }
        .ben-card::after {
          content: "";
          position: absolute;
          width: 200px;
          height: 200px;
          right: -76px;
          bottom: -108px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0) 72%);
          pointer-events: none;
          z-index: 1;
        }
        .ben-card:nth-child(2n)::after {
          right: auto;
          left: -82px;
          bottom: -118px;
          background: radial-gradient(circle, rgba(251, 146, 60, 0.16) 0%, rgba(251, 146, 60, 0) 70%);
        }
        .ben-card:hover {
          transform: translateY(-8px) scale(1.01);
          border-color: rgba(255, 255, 255, 0.98);
          box-shadow:
            0 30px 60px rgba(17, 17, 17, 0.13),
            0 8px 20px rgba(17, 17, 17, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 1),
            inset 0 -1px 0 rgba(255, 255, 255, 0.52);
        }

        .ben-card-wide { grid-column: span 2; }

        .ben-card-num {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: var(--orange);
          margin-bottom: 0.55rem;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
          letter-spacing: -0.03em;
        }
        .ben-card-title {
          font-weight: 700;
          font-size: 1.02rem;
          margin-bottom: 0.45rem;
          line-height: 1.3;
          color: var(--text-primary);
        }
        .ben-card-desc {
          font-size: 0.9rem;
          color: rgba(17, 17, 17, 0.58);
          line-height: 1.65;
        }

        @media (prefers-reduced-motion: reduce) {
          .ben-card {
            transition: none;
          }
          .ben-card:hover {
            transform: none;
          }
        }

        @media (max-width: 900px) {
          .ben-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ben-card-wide { grid-column: span 2 !important; }
        }
        @media (max-width: 700px) {
          .ben-card {
            padding: 1.7rem;
            border-radius: 22px;
          }
          .ben-card-num {
            font-size: clamp(1.8rem, 7vw, 2.45rem);
          }
          .ben-card-desc {
            font-size: 0.84rem;
          }
        }
        @media (max-width: 480px) {
          .ben-grid { grid-template-columns: 1fr !important; }
          .ben-card-wide { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
