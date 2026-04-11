import { useEffect, useState, useRef, useCallback } from "react";
import logo from "../assets/logo.png";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Solution", href: "#solution" },
  { label: "How It Works", href: "#hiw" },
  { label: "Benefits", href: "#benefits" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [hovered, setHover] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    const firstLink = menuRef.current?.querySelector("a");
    firstLink?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = href === "#home" ? document.body : document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: solid ? "0.5rem 5rem" : "0.8rem 5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: solid || menuOpen ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: solid || menuOpen ? "blur(22px)" : "none",
        WebkitBackdropFilter: solid || menuOpen ? "blur(22px)" : "none",
        borderBottom: solid || menuOpen ? "1px solid rgba(249,115,22,0.1)" : "1px solid transparent",
        boxShadow: solid || menuOpen ? "0 2px 24px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.38s cubic-bezier(0.4,0,0.2,1)",
      }}
      className="lumera-nav"
      >
        {/* Logo */}
        <a href="#home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          onClick={(e) => handleAnchor(e, "#home")}>
          <img
            src={logo}
            alt="Lumera Energy"
            style={{
              height: "100px", width: "auto",
              filter: solid || menuOpen ? "none" : "brightness(0) invert(1)",
              transition: "filter 0.38s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </a>

        {/* Desktop Links */}
        <ul style={{
          display: "flex", gap: "2.2rem", listStyle: "none", alignItems: "center",
        }} className="nav-links-desktop">
          {LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  color: hovered === href ? "#F97316" : solid ? "#334155" : "rgba(255,255,255,0.75)",
                  textDecoration: "none", fontSize: "0.875rem", fontWeight: 500,
                  letterSpacing: "0.03em", transition: "color 0.25s",
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

        {/* Desktop CTA */}
        <a href="#contact" className="btn-primary nav-cta-desktop"
          style={{ padding: "0.6rem 1.4rem", fontSize: "0.85rem" }}
          onClick={(e) => handleAnchor(e, "#contact")}>
          Get Free Audit
        </a>

        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{
            display: "none", flexDirection: "column", gap: "5px",
            alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer",
            padding: "10px", minWidth: "44px", minHeight: "44px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: "24px", height: "2px",
              background: solid || menuOpen ? "#0C1220" : "#fff",
              borderRadius: "2px",
              transition: "all 0.3s",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                : i === 1 ? "opacity: 0; scaleX(0)"
                : "rotate(-45deg) translate(5px, -5px)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(255,255,255,0.98)", zIndex: 999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "2rem",
            backdropFilter: "blur(20px)",
          }}
        >
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleAnchor(e, href)}
              style={{
                fontSize: "2rem", fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
                color: "#0C1220", textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.color = "#F97316"}
              onMouseLeave={(e) => e.target.style.color = "#0C1220"}
            >
              {label}
            </a>
          ))}
          <a href="#contact" className="btn-primary" style={{ marginTop: "1rem" }}
            onClick={(e) => handleAnchor(e, "#contact")}>
            Get Free Audit
          </a>
        </div>
      )}
    </>
  );
}
