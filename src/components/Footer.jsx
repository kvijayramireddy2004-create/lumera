import logo from "../assets/logo.png";

const links = [
  { label: "About", href: "#about" },
  { label: "Solution", href: "#solution" },
  { label: "Process", href: "#hiw" },
  { label: "Benefits", href: "#benefits" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const go = (href) => (e) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer style={{ background: "var(--bg-dark)", borderTop: "1px solid var(--border-dark)" }}>
      <div style={{
        maxWidth: "var(--max-w)", margin: "0 auto",
        padding: "4rem var(--section-x) 2rem",
      }}>
        {/* Top row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexWrap: "wrap", gap: "3rem", paddingBottom: "3rem",
          borderBottom: "1px solid var(--border-dark)",
        }} className="footer-top">
          <div>
            <img src={logo} alt="Lumera Energy" style={{ height: "100px", width: "auto", filter: "brightness(0) invert(1)", marginBottom: "1rem" }} />
            <p style={{ fontSize: "0.82rem", color: "var(--text-white-muted)", maxWidth: "280px", lineHeight: 1.7 }}>
              Delivering clean, affordable solar power to Indian industry through long-term Power Purchase Agreements.
            </p>
          </div>

          <nav aria-label="Footer" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {links.map(({ label, href }) => (
              <a key={label} href={href} onClick={go(href)} style={{
                fontSize: "0.82rem", color: "var(--text-white-muted)",
                textDecoration: "none", transition: "color 0.2s",
                padding: "0.5rem 0", minHeight: "44px", display: "inline-flex", alignItems: "center",
              }}
                onMouseEnter={(e) => e.target.style.color = "var(--orange)"}
                onMouseLeave={(e) => e.target.style.color = "var(--text-white-muted)"}
              >{label}</a>
            ))}
          </nav>

          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-white-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.8rem" }}>Contact</div>
            <a href="tel:+919550800865" style={{ display: "block", fontSize: "0.82rem", color: "var(--text-white-muted)", textDecoration: "none", marginBottom: "0.3rem" }}>+91 9550800865</a>
            <a href="mailto:harshavardhanravana@lumeraenergy.in" style={{ display: "block", fontSize: "0.82rem", color: "var(--text-white-muted)", textDecoration: "none" }}>harshavardhanravana@lumeraenergy.in</a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: "1.5rem", flexWrap: "wrap", gap: "1rem",
        }}>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
            © 2025 Lumera Energy. All rights reserved.
          </div>
          <a
            href="/attribution.html"
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.55)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { e.target.style.color = "var(--orange)"; }}
            onMouseLeave={(e) => { e.target.style.color = "rgba(255,255,255,0.55)"; }}
          >
            Media Attribution
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-top { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
