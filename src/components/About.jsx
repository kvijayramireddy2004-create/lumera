export default function About() {
  return (
    <section id="about" className="section" style={{ background: "var(--bg-white)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "6rem", alignItems: "center",
        }} className="about-grid">

          {/* Text */}
          <div>
            <div className="eyebrow">About Lumera Energy</div>
            <h2 style={{
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              lineHeight: 0.95, marginBottom: "2rem",
            }}>
              We Power <span className="grad-text">Industries</span>
              <br />With Clean Solar
            </h2>
            <div className="divider" />

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                "Lumera Energy is a renewable energy company focused on supplying solar power to industrial consumers across India.",
                "We develop, own, and operate solar power plants and supply electricity directly to industries through long-term Power Purchase Agreements (PPA).",
                "Our goal: build a new energy ecosystem where industries access affordable, predictable renewable power — enabling sustainable manufacturing.",
              ].map((text, i) => (
                <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span aria-hidden="true" style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "var(--orange)", marginTop: "10px", flexShrink: 0,
                  }} />
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>{text}</p>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#contact" className="btn btn--primary"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                Start Your Journey →
              </a>
              <a href="#solution" className="btn btn--outline"
                onClick={(e) => { e.preventDefault(); document.querySelector("#solution")?.scrollIntoView({ behavior: "smooth" }); }}>
                See Our Solution
              </a>
            </div>
          </div>

          {/* Image */}
          <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80"
              alt="Industrial solar power plant with rows of panels powering manufacturing facilities"
              loading="lazy"
              style={{ width: "100%", height: "520px", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem",
              background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)",
              borderRadius: "14px", padding: "1.2rem 1.4rem",
              display: "flex", alignItems: "center", gap: "1rem",
            }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "10px",
                background: "var(--orange)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0,
              }}><span aria-hidden="true">☀️</span></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>Solar Power Plants</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Developed, Owned &amp; Operated by Lumera</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .about-grid img { height: 300px !important; }
        }
      `}</style>
    </section>
  );
}
