const STEPS = [
  { num: "01", title: "Lumera Builds", desc: "We develop and own a solar power plant sized precisely for your industrial consumption profile." },
  { num: "02", title: "Power Generated", desc: "Clean solar electricity is generated consistently and reliably at scale, year-round." },
  { num: "03", title: "Supplied to You", desc: "Electricity flows directly to your industrial facility without interruption." },
  { num: "04", title: "PPA Agreement", desc: "You pay a stable, pre-agreed tariff through a long-term Power Purchase Agreement." },
];

export default function HowItWorks() {
  return (
    <section id="hiw" className="section section--dark">
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "5rem", maxWidth: "550px", margin: "0 auto 5rem" }}>
          <div className="eyebrow eyebrow--light">The Process</div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 0.95, color: "#fff",
          }}>
            How It <span className="grad-text">Works</span>
          </h2>
          <p style={{ color: "var(--text-white-muted)", fontSize: "0.95rem", marginTop: "1.5rem", lineHeight: 1.75 }}>
            A streamlined 4-step model that gives your industry clean power with zero complexity or capital risk.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem",
        }} className="hiw-grid">
          {STEPS.map((s) => (
            <div key={s.num} style={{ textAlign: "center" }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                border: "2px solid rgba(249,115,22,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700,
                color: "var(--orange)", margin: "0 auto 1.5rem",
                transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--orange)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--orange)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--orange)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; }}
              >{s.num}</div>
              <h3 style={{
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.04em", color: "#fff",
                marginBottom: "0.7rem", lineHeight: 1.3,
              }}>{s.title}</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-white-muted)", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <p style={{ color: "var(--text-white-muted)", fontSize: "0.88rem", fontStyle: "italic", marginBottom: "2rem" }}>
            This allows industries to reduce operational energy costs without any capital investment.
          </p>
          <a href="#contact" className="btn-pill btn-orange"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            Get Your Free Energy Audit <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .hiw-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 3rem !important; } }
        @media (max-width: 480px) { .hiw-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
