import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── SVG Icons ── */
function AlertCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function WalletIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 10h20M16 14.5h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 6V5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function PlugIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22v-5m0 0a5 5 0 0 0 5-5V8H7v4a5 5 0 0 0 5 5zM9 2v4m6-4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l8 4v5c0 5.25-3.5 10.74-8 12-4.5-1.26-8-6.75-8-12V6l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function WrenchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PROBLEMS = [
  { tag: "Tariff Hike", text: "Base energy tariff from grid utilities escalates year over year" },
  { tag: "FPPCA", text: "Fuel & Power Purchase Cost Adjustments add unpredictable surcharges" },
  { tag: "Surcharge", text: "Recurring fuel surcharge revisions steadily erode operating margins" },
  { tag: "Uncertainty", text: "Zero long-term pricing visibility makes energy budgeting impossible" },
];

const SOLUTIONS = [
  {
    icon: <WalletIcon />,
    title: "We Build It",
    desc: "Lumera finances, designs, and constructs a solar plant sized precisely for your facility — zero capital from you.",
  },
  {
    icon: <PlugIcon />,
    title: "You Use It",
    desc: "Clean solar electricity delivered directly to your industrial facility through the grid — reliable and consistent.",
  },
  {
    icon: <ShieldIcon />,
    title: "Fixed Rate",
    desc: "A locked-in tariff through a long-term PPA protects your margins from every future market revision.",
  },
  {
    icon: <WrenchIcon />,
    title: "We Maintain It",
    desc: "Lumera handles all operations, maintenance, and monitoring — you simply consume the power.",
  },
];

export default function ProblemSolution() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const headRef = useRef(null);
  const arrowColRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !lineRef.current || !headRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      const travelDistance = isMobile
        ? Math.max((lineRef.current?.offsetWidth ?? 0) + 10, 60)
        : Math.max((lineRef.current?.offsetHeight ?? 0) + 10, 220);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      });

      tl.fromTo(
        lineRef.current,
        isMobile ? { scaleX: 0 } : { scaleY: 0 },
        isMobile ? { scaleX: 1, ease: "none" } : { scaleY: 1, ease: "none" },
        0
      );

      tl.fromTo(
        headRef.current,
        isMobile
          ? { x: -travelDistance, scale: 0.6, opacity: 0 }
          : { y: -travelDistance, scale: 0.6, opacity: 0 },
        isMobile
          ? { x: 0, scale: 1, opacity: 1, ease: "power2.out" }
          : { y: 0, scale: 1, opacity: 1, ease: "power2.out" },
        0.05
      );

      tl.fromTo(
        headRef.current,
        { boxShadow: "0 0 0px rgba(249,115,22,0)" },
        { boxShadow: "0 0 28px rgba(249,115,22,0.45)", ease: "none" },
        0.5
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="solution" className="section ps-section" ref={sectionRef}>
      <div className="ps-container">
        {/* ── Header ── */}
        <div className="ps-header reveal-up">
          <div className="eyebrow" style={{ color: "var(--text-light)" }}>
            The Challenge &amp; Our Answer
          </div>
          <h2 className="ps-heading">
            Your energy costs are{" "}
            <span className="grad-text">rising</span>.
            <br />
            Here's how we fix it.
          </h2>
        </div>

        <div className="ps-grid">
          {/* ── Problem ── */}
          <div className="ps-problem reveal-left">
            <div className="ps-problem-badge">The Problem</div>
            <h3 className="ps-problem-title">
              Why your electricity bills keep climbing
            </h3>
            <p className="ps-problem-subtitle">
              Indian industrial tariffs have risen 8–12% annually. Four
              structural forces drive this:
            </p>
            <ul className="ps-problem-list">
              {PROBLEMS.map((p, i) => (
                <li key={i} className="ps-problem-item">
                  <div className="ps-problem-icon">
                    <AlertCircle />
                  </div>
                  <div>
                    <span className="ps-problem-tag">{p.tag}</span>
                    <p className="ps-problem-text">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Arrow / transition ── */}
          <div className="ps-arrow-col" ref={arrowColRef} aria-hidden="true">
            <div className="ps-arrow-track">
              <div className="ps-arrow-line" ref={lineRef} />
              <div className="ps-arrow-head" ref={headRef}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* ── Solutions ── */}
          <div className="ps-solutions-wrap stagger-children">
            <div className="ps-sol-badge">Our Solution</div>
            <div className="ps-solutions">
              {SOLUTIONS.map((s, i) => (
                <div key={i} className="ps-sol-card">
                  <div className="ps-sol-icon">{s.icon}</div>
                  <div>
                    <h3 className="ps-sol-title">{s.title}</h3>
                    <p className="ps-sol-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ps-section {
          background:
            radial-gradient(ellipse 900px 500px at 10% 0%, rgba(249,115,22,0.04) 0%, transparent 70%),
            var(--bg-white);
        }
        .ps-container {
          max-width: var(--max-w);
          margin: 0 auto;
        }
        .ps-header {
          text-align: center;
          max-width: 620px;
          margin: 0 auto 4.5rem;
        }
        .ps-heading {
          font-size: clamp(2rem, 4.2vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        /* ── Grid ── */
        .ps-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr);
          gap: 1.7rem;
          align-items: stretch;
        }

        /* ── Problem card ── */
        .ps-problem {
          background: #0f1117;
          border-radius: 22px;
          padding: 2.4rem;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 16px 40px rgba(5, 8, 18, 0.28);
        }
        .ps-problem-badge {
          display: inline-block;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #f87171;
          background: rgba(248, 113, 113, 0.12);
          border: 1px solid rgba(248, 113, 113, 0.2);
          border-radius: 100px;
          padding: 0.35rem 0.9rem;
          margin-bottom: 1.5rem;
        }
        .ps-problem-title {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.6rem;
          color: #fff;
        }
        .ps-problem-subtitle {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          margin-bottom: 1.8rem;
        }
        .ps-problem-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .ps-problem-item {
          display: flex;
          gap: 0.9rem;
          align-items: flex-start;
          padding: 0.9rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ps-problem-item:last-child { border-bottom: none; }
        .ps-problem-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(248, 113, 113, 0.1);
          color: #f87171;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .ps-problem-tag {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(248, 113, 113, 0.8);
          margin-bottom: 0.25rem;
        }
        .ps-problem-text {
          font-size: 0.86rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.55;
        }

        /* ── Arrow connector ── */
        .ps-arrow-col {
          display: flex;
          align-items: stretch;
          justify-content: center;
          min-width: 64px;
          padding-top: 0.9rem;
          align-self: stretch;
        }
        .ps-arrow-track {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          min-height: 100%;
          position: relative;
          padding-bottom: 0.65rem;
          padding-top: 0.6rem;
        }
        .ps-arrow-line {
          width: 2px;
          flex: 1;
          min-height: 180px;
          background: linear-gradient(180deg, var(--border-light) 0%, var(--orange) 100%);
          border-radius: 2px;
          transform-origin: top center;
        }
        .ps-arrow-head {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--orange);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.5rem;
        }

        /* ── Solution cards ── */
        .ps-solutions-wrap {
          display: flex;
          flex-direction: column;
          padding-top: 0.7rem;
        }
        .ps-solutions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .ps-sol-badge {
          display: inline-block;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--orange);
          background: rgba(249, 115, 22, 0.08);
          border: 1px solid rgba(249, 115, 22, 0.2);
          border-radius: 100px;
          padding: 0.35rem 0.9rem;
          margin-bottom: 0.85rem;
          align-self: flex-start;
        }
        .ps-sol-card {
          display: flex;
          gap: 1.1rem;
          align-items: flex-start;
          padding: 1.4rem 1.5rem;
          border-radius: 16px;
          border: 1px solid var(--border-light);
          background: var(--bg-white);
          box-shadow: 0 1px 0 rgba(17, 17, 17, 0.03);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .ps-sol-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.06);
          border-color: rgba(249, 115, 22, 0.25);
        }
        .ps-sol-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(249, 115, 22, 0.08);
          color: var(--orange);
          flex-shrink: 0;
        }
        .ps-sol-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
          line-height: 1.3;
        }
        .ps-sol-desc {
          font-size: 0.86rem;
          color: #666;
          line-height: 1.62;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ps-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .ps-arrow-col {
            display: none;
          }
          .ps-solutions-wrap {
            padding-top: 0;
          }
        }
        @media (max-width: 480px) {
          .ps-problem { padding: 1.6rem; }
          .ps-sol-card { padding: 1.1rem; }
        }
      `}</style>
    </section>
  );
}
