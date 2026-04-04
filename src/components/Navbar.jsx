import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Solution", href: "#solution" },
  { label: "How It Works", href: "#hiw" },
  { label: "Benefits", href: "#benefits" },
];

const styles = {
  nav: (solid) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: solid ? "0.85rem 5rem" : "1.4rem 5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: solid ? "rgba(255,255,255,0.92)" : "transparent",
    backdropFilter: solid ? "blur(22px)" : "none",
    WebkitBackdropFilter: solid ? "blur(22px)" : "none",
    borderBottom: solid
      ? "1px solid rgba(249,115,22,0.1)"
      : "1px solid transparent",
    boxShadow: solid ? "0 2px 24px rgba(0,0,0,0.06)" : "none",
    transition: "all 0.38s cubic-bezier(0.4,0,0.2,1)",
  }),
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "0.65rem",
    textDecoration: "none",
  },
  logoText: (solid) => ({
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "1.32rem",
    fontWeight: 800,
    letterSpacing: "0.07em",
    color: solid ? "#0C1220" : "#FFFFFF",
    transition: "color 0.38s",
  }),
  links: {
    display: "flex",
    gap: "2.2rem",
    listStyle: "none",
    alignItems: "center",
  },
  link: (solid) => ({
    color: solid ? "#334155" : "rgba(255,255,255,0.75)",
    textDecoration: "none",
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "0.03em",
    transition: "color 0.25s",
    position: "relative",
  }),
};

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [hovered, setHover] = useState(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav style={styles.nav(solid)}>
      {/* Logo */}
      <a
        href="#home"
        style={styles.logoWrap}
        onClick={(e) => handleAnchor(e, "#home")}
      >
        <img
          src={logo}
          alt="Lumera Energy"
          style={{
            height: "100px",
            width: "auto",
            filter: solid ? "none" : "brightness(0) invert(1)",
            transition: "filter 0.38s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </a>

      {/* Links */}
      <ul style={styles.links}>
        {LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                ...styles.link(solid),
                color:
                  hovered === href
                    ? "#F97316"
                    : solid
                    ? "#334155"
                    : "rgba(255,255,255,0.75)",
              }}
              onMouseEnter={() => setHover(href)}
              onMouseLeave={() => setHover(null)}
              onClick={(e) => handleAnchor(e, href)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className="btn-primary"
        style={{ padding: "0.6rem 1.4rem", fontSize: "0.85rem" }}
        onClick={(e) => handleAnchor(e, "#contact")}
      >
        Get Free Audit
      </a>
    </nav>
  );
}
