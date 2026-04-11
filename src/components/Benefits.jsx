import { useEffect, useRef, useState } from "react";

/* ── CountUp ── */
function CountUp({ end, suffix = "", prefix = "", decimals = 0, duration = 2 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          if (prefersReduced) {
            setValue(end);
            return;
          }
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(eased * end);
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(end);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ── Data ── */
const BENEFITS = [
  {
    value: 40,
    prefix: "20–",
    suffix: "%",
    title: "Reduction in Electricity Cost",
    desc: "Industries on our PPA model typically see immediate savings versus grid tariff — starting from month one of supply.",
  },
  {
    label: "₹0",
    title: "Capital Investment Required",
    desc: "Lumera fully funds, builds, and operates the solar plant. Your business invests nothing upfront.",
  },
  {
    value: 25,
    suffix: "+",
    title: "Years of Price Visibility",
    desc: "Long-term tariff lock through our PPA gives you energy pricing certainty for planning and budgeting.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="section ben-section">
      <div className="ben-container">
        {/* ── Header ── */}
        <div className="ben-header reveal-up">
          <div className="eyebrow" style={{ color: "var(--text-light)" }}>
            Why Choose Lumera
          </div>
          <h2 className="ben-heading">
            Real, measurable <span className="grad-text">impact</span>.
          </h2>
        </div>

        {/* ── Stat Rows ── */}
        <div className="ben-rows stagger-children">
          {BENEFITS.map((b, i) => (
            <div key={i} className="ben-row">
              <div className="ben-row-num">
                {b.label ? (
                  b.label
                ) : (
                  <CountUp
                    end={b.value}
                    prefix={b.prefix || ""}
                    suffix={b.suffix || ""}
                    decimals={b.decimals || 0}
                  />
                )}
              </div>
              <div className="ben-row-content">
                <h3 className="ben-row-title">{b.title}</h3>
                <p className="ben-row-desc">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ben-section {
          background: var(--bg-warm);
        }
        .ben-container {
          max-width: 960px;
          margin: 0 auto;
        }
        .ben-header {
          margin-bottom: 2.5rem;
        }
        .ben-heading {
          font-size: clamp(2rem, 4.2vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        /* ── Rows ── */
        .ben-rows {
          display: flex;
          flex-direction: column;
        }

        .ben-row {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 3rem;
          align-items: baseline;
          padding: 1.6rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }
        .ben-row:first-child {
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }
        .ben-row:hover {
          transform: translateX(6px);
        }

        /* ── Number ── */
        .ben-row-num {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4vw, 2.8rem);
          font-weight: 900;
          color: var(--orange);
          line-height: 1;
          letter-spacing: -0.04em;
          white-space: nowrap;
        }

        /* ── Content ── */
        .ben-row-title {
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.45rem;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }
        .ben-row-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.75;
          max-width: 540px;
        }

        /* ── Responsive ── */
        @media (prefers-reduced-motion: reduce) {
          .ben-row { transition: none; }
          .ben-row:hover { transform: none; }
        }
        @media (max-width: 700px) {
          .ben-row {
            grid-template-columns: 1fr;
            gap: 0.6rem;
            padding: 2rem 0;
          }
          .ben-row-num {
            font-size: clamp(2.2rem, 10vw, 3rem);
          }
          .ben-row:hover {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
