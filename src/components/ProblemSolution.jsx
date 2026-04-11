const PROBLEMS = [
  "High base energy tariff from grid utilities",
  "Fuel & Power Purchase Cost Adjustment (FPPCA)",
  "Recurring fuel surcharge adjustments",
  "Unpredictable periodic tariff revisions",
];

const SOLUTIONS = [
  { title: "Zero Upfront Cost", desc: "No capital expenditure. We invest, build, and own the solar plant. You pay only for power consumed." },
  { title: "Lower Electricity Cost", desc: "Save 20–40% vs your current grid tariff starting from day one of supply." },
  { title: "Predictable Tariff", desc: "Fixed locked-in rate protects your margins from market and policy volatility." },
  { title: "Clean Renewable Supply", desc: "100% solar power. Strengthen your ESG credentials and sustainability goals." },
];

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M13.5 2.5L5.5 13h5l-1 8.5 8-10.5h-5l1-8.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M4.5 16l5.2-5.2 3.2 3.2 6.6-6.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 7.4h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProblemSolution() {
  return (
    <section id="solution" className="section" style={{ background: "var(--bg-white)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem", maxWidth: "650px", margin: "0 auto 5rem" }}>
          <div className="eyebrow" style={{ color: "var(--text-light)" }}>The Challenge &amp; Our Answer</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}>
            Why Bills Keep Rising —{" "}
            <span className="grad-text">And Our Fix</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="ps-grid">

          {/* Problem Card */}
          <div style={{
            background: "var(--bg-white)", borderRadius: "20px",
            padding: "2.5rem", border: "1px solid var(--border-light)",
          }}>
            <h3 style={{
              fontSize: "1.3rem",
              fontWeight: 700, marginBottom: "1.8rem",
              display: "flex", alignItems: "center", gap: "0.75rem", lineHeight: 1.3,
            }}>
              <span className="ps-heading-icon" aria-hidden="true">
                <BoltIcon />
              </span>
              Why Your Bills Keep Rising
            </h3>

            <ul style={{ listStyle: "none" }}>
              {PROBLEMS.map((p, i) => (
                <li key={i} style={{
                  display: "flex", gap: "0.75rem", alignItems: "flex-start",
                  padding: "0.8rem 0",
                  borderBottom: i < PROBLEMS.length - 1 ? "1px solid var(--border-light)" : "none",
                  fontSize: "0.9rem", color: "var(--text-secondary)",
                }}>
                  <span className="ps-list-icon" aria-hidden="true">
                    <TrendUpIcon />
                  </span>
                  <span>Rising cost: {p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="sol-grid">
            {SOLUTIONS.map((s, i) => (
              <div key={i} style={{
                background: "var(--bg-white)", borderRadius: "16px",
                padding: "1.8rem", border: "1px solid var(--border-light)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <h3 style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  letterSpacing: "0.03em", marginBottom: "0.6rem", lineHeight: 1.3,
                }}>{s.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .ps-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .sol-grid { grid-template-columns: 1fr !important; } }

        .ps-heading-icon {
          width: 1.9rem;
          height: 1.9rem;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #d97706;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.28);
          flex-shrink: 0;
        }

        .ps-list-icon {
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #dc2626;
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.24);
          flex-shrink: 0;
          margin-top: 1px;
        }
      `}</style>
    </section>
  );
}
