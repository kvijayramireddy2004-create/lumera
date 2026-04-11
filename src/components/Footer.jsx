import logo from "../assets/logo.png";

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
        <img src={logo} alt="Lumera Energy" style={{ height: "70px", width: "auto", filter: "brightness(0) invert(1)" }} />

        {/* Links */}
        <nav aria-label="Footer" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {links.map((l, i) => (
            <a
              key={l}
              href={hrefs[i]}
              onClick={go(hrefs[i])}
              style={{
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                transition: "color 0.25s",
                padding: "0.5rem 0", minHeight: "44px", display: "inline-flex", alignItems: "center",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#F97316")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(255,255,255,0.7)")
              }
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Copy */}
        <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>
          © 2025 Lumera Energy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
