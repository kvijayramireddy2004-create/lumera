const BENEFITS = [
  { num: "20–40%", title: "Reduction in Electricity Cost", desc: "Industries on our PPA model see 20–40% savings from day one.", wide: true },
  { num: "Zero", title: "Capital Expenditure", desc: "Lumera fully funds, builds, and operates the solar plant." },
  { num: "100%", title: "Tariff Protection", desc: "Fixed long-term rate shields you from market volatility." },
  { num: "∞", title: "Reliable Renewable Supply", desc: "Consistent clean solar energy for your operations." },
  { num: "25+", title: "Years Price Visibility", desc: "Long-term energy price predictability for your business." },
];

export default function Benefits() {
  return (
    <section id="benefits" className="section" style={{ background: "var(--bg-white)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="eyebrow">Why Choose Lumera</div>
          <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 0.95 }}>
            Real, Measurable <span className="grad-text">Benefits</span>
          </h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.2rem",
        }} className="ben-grid">
          {BENEFITS.map((b, i) => (
            <div key={i} style={{
              gridColumn: b.wide ? "span 2" : "span 1",
              background: "var(--bg-light)", borderRadius: "20px",
              padding: "2.5rem", transition: "transform 0.3s ease",
              border: "1px solid var(--border-light)",
              position: "relative", overflow: "hidden",
            }}
              className={b.wide ? "ben-card-wide" : ""}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900, color: "var(--orange)", marginBottom: "0.5rem",
              }}>{b.num}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", lineHeight: 1.3 }}>{b.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .ben-grid { grid-template-columns: repeat(2, 1fr) !important; } .ben-card-wide { grid-column: span 2 !important; } }
        @media (max-width: 480px) { .ben-grid { grid-template-columns: 1fr !important; } .ben-card-wide { grid-column: span 1 !important; } }
      `}</style>
    </section>
  );
}
