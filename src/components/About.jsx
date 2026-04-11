const IMAGE_URL =
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=85";

const PILLARS = [
  {
    num: "01",
    title: "Develop",
    desc: "Custom solar plants sized for your industrial consumption profile",
  },
  {
    num: "02",
    title: "Own",
    desc: "We invest the capital — zero cost, zero risk to you",
  },
  {
    num: "03",
    title: "Operate",
    desc: "Full maintenance, monitoring & performance guarantee",
  },
];

const MARQUEE_WORDS = [
  "Solar Power",
  "Industrial Energy",
  "Zero Investment",
  "Clean Manufacturing",
  "Fixed Tariffs",
  "25-Year PPAs",
  "Sustainable Growth",
  "Energy Independence",
];

export default function About() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="section about-section">
      <div className="about-container">
        <div className="about-grid">
          {/* ── Content ── */}
          <div className="about-content">
            <div
              className="eyebrow reveal-up"
              style={{ color: "var(--text-light)" }}
            >
              About Lumera Energy
            </div>
            <h2 className="about-heading reveal-up">
              We don't just
              <br />
              install panels.
              <br />
              <span className="grad-text">We power industries.</span>
            </h2>
            <div className="about-accent-line reveal-up" />
            <p className="about-desc reveal-up">
              Lumera Energy is a renewable energy company focused on supplying
              solar power to industrial consumers across India — building a new
              energy ecosystem where industries access affordable, predictable
              renewable power for sustainable manufacturing.
            </p>

            <div className="about-pillars stagger-children">
              {PILLARS.map((p) => (
                <div key={p.num} className="about-pillar">
                  <span className="about-pillar-num">{p.num}</span>
                  <div>
                    <h3 className="about-pillar-title">{p.title}</h3>
                    <p className="about-pillar-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-cta reveal-up">
              <a
                href="#contact"
                className="btn-pill btn-dark"
                onClick={scrollTo("#contact")}
              >
                Start Your Journey <span className="arrow">→</span>
              </a>
              <a
                href="#solution"
                className="btn-pill btn-outline"
                onClick={scrollTo("#solution")}
              >
                See Our Solution <span className="arrow">→</span>
              </a>
            </div>
          </div>

          {/* ── Visual ── */}
          <div className="about-visual reveal-scale">
            <div className="about-img-wrap">
              <img
                src={IMAGE_URL}
                alt="Industrial solar power plant with rows of panels powering manufacturing facilities"
                loading="lazy"
                className="about-img"
              />
            </div>
            <div className="about-img-accent" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* ── Marquee ── */}
      <div className="about-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1, 2].map((i) => (
            <div key={i} className="marquee-group">
              {MARQUEE_WORDS.map((word, j) => (
                <span key={j} className="marquee-item">
                  {word}
                  <span className="marquee-sep">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-section {
          background: var(--bg-warm);
          overflow: hidden;
        }
        .about-container {
          max-width: var(--max-w);
          margin: 0 auto;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .about-heading {
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.035em;
        }
        .about-accent-line {
          width: 56px;
          height: 3px;
          background: var(--orange);
          border-radius: 3px;
          margin-bottom: 1.5rem;
        }
        .about-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.85;
          max-width: 520px;
          margin-bottom: 2.5rem;
        }

        /* ── Pillars ── */
        .about-pillars {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .about-pillar {
          display: flex;
          gap: 1.2rem;
          align-items: flex-start;
          padding: 1.15rem 1.35rem;
          border-radius: 14px;
          border-left: 3px solid var(--orange);
          background: rgba(255, 255, 255, 0.55);
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .about-pillar:hover {
          background: rgba(255, 255, 255, 0.92);
          transform: translateX(5px);
        }
        .about-pillar-num {
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--orange);
          letter-spacing: 0.06em;
          padding-top: 3px;
          flex-shrink: 0;
        }
        .about-pillar-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
          line-height: 1.3;
        }
        .about-pillar-desc {
          font-size: 0.84rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* ── CTA ── */
        .about-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1rem;
        }

        /* ── Image ── */
        .about-visual {
          position: relative;
        }
        .about-img-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          z-index: 2;
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.12);
        }
        .about-img {
          width: 100%;
          height: 560px;
          object-fit: cover;
          display: block;
          transition: transform 6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .about-img-wrap:hover .about-img {
          transform: scale(1.04);
        }
        .about-img-accent {
          position: absolute;
          top: 18px;
          left: 18px;
          right: -18px;
          bottom: -18px;
          border: 2px solid var(--orange);
          border-radius: 22px;
          z-index: 1;
          opacity: 0.25;
        }

        /* ── Marquee ── */
        .about-marquee {
          margin-top: 5rem;
          padding: 1.4rem 0;
          overflow: hidden;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 45s linear infinite;
        }
        .marquee-group {
          display: flex;
          flex-shrink: 0;
        }
        .marquee-item {
          font-size: clamp(0.85rem, 1.4vw, 1.05rem);
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          padding: 0 0.4rem;
          letter-spacing: -0.01em;
        }
        .marquee-sep {
          color: var(--orange);
          margin: 0 1rem;
          font-size: 0.55em;
          vertical-align: middle;
          opacity: 0.7;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }

        /* ── Responsive ── */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
          .about-img { transition: none; }
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .about-img {
            height: 340px;
          }
          .about-img-accent {
            display: none;
          }
          .about-marquee {
            margin-top: 3.5rem;
          }
        }
        @media (max-width: 480px) {
          .about-pillars { gap: 0.7rem; }
          .about-pillar { padding: 0.9rem 1rem; }
          .about-cta { flex-direction: column; }
          .about-cta .btn-pill { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
