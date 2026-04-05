const links = ["About", "Solution", "How It Works", "Benefits", "Contact"];
const hrefs = ["#about", "#solution", "#hiw", "#benefits", "#contact"];

export default function Footer() {
  const go = (href) => (e) => {
    e.preventDefault();
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      style={{
        background: "#06090F",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      className="footer-wrap"
    >
      <div
        className="footer-inner"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <svg width="32" height="32" viewBox="0 0 46 46" fill="none">
            <path d="M8 40 L22 7 L32 22 H25 L37 40 Z" fill="#1B2E52" />
            <path d="M25 5 L38 1 L31 20 Z" fill="#FCD34D" />
            <path d="M22 7 L31 20 L25 5 Z" fill="#F97316" />
          </svg>
          <span
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: "1.05rem",
              fontWeight: 800,
              letterSpacing: "0.07em",
              color: "#fff",
            }}
          >
            LUMERA <span style={{ color: "#F97316" }}>ENERGY</span>
          </span>
        </div>

        {/* Links */}
        <nav style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {links.map((l, i) => (
            <a
              key={l}
              href={hrefs[i]}
              onClick={go(hrefs[i])}
              style={{
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.38)",
                textDecoration: "none",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#F97316")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(255,255,255,0.38)")
              }
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Copy */}
        <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.28)" }}>
          © 2025 Lumera Energy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
