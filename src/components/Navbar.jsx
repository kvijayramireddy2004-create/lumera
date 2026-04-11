import { useEffect, useState, useRef, useCallback } from "react";
import logo from "../assets/logo.png";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Solution", href: "#solution" },
  { label: "Process", href: "#hiw" },
  { label: "Benefits", href: "#benefits" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  });
  const hamburgerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const onKey = (e) => {
      if (e.key === "Escape") { closeMenu(); return; }
      if (e.key === "Tab" && menu) {
        const focusable = menu.querySelectorAll("a, button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    menu?.querySelector("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const go = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const solid = scrolled || menuOpen;
  const navHeight = isMobile ? (solid ? "60px" : "68px") : (solid ? "64px" : "80px");

  return (
    <>
      <nav
        aria-label="Primary"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: isMobile ? "0 clamp(1rem, 4vw, 1.2rem)" : "0 var(--section-x)",
          height: navHeight,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: solid ? "rgba(255,255,255,0.6)" : "transparent",
          backdropFilter: solid ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: solid ? "blur(24px) saturate(180%)" : "none",
          borderBottom: solid ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
          transition: "all 0.35s ease",
        }}
      >
        <a href="#home" onClick={(e) => go(e, "#home")} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src={logo} alt="Lumera Energy — Home"
            style={{
              height: isMobile ? (solid ? "42px" : "48px") : (solid ? "48px" : "60px"),
              width: "auto",
              transform: isMobile
                ? (solid ? "translateX(-8px) scale(1.55)" : "translateX(-10px) scale(1.72)")
                : (solid ? "translateX(-18px) scale(2)" : "translateX(-22px) scale(2.2)"),
              transformOrigin: "left center",
              filter: solid ? "none" : "brightness(0) invert(1)",
              transition: "all 0.35s ease",
            }}
          />
        </a>

        {/* Desktop Links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {LINKS.map(({ label, href }) => (
            <a
              key={href} href={href}
              onClick={(e) => go(e, href)}
              style={{
                color: solid ? "var(--text-secondary)" : "rgba(255,255,255,0.8)",
                textDecoration: "none", fontSize: "0.82rem", fontWeight: 500,
                padding: "0.5rem 0.9rem", borderRadius: "8px",
                transition: "color 0.2s, background 0.2s",
                minHeight: "44px", display: "inline-flex", alignItems: "center",
              }}
              onMouseEnter={(e) => { e.target.style.color = "var(--orange)"; }}
              onMouseLeave={(e) => { e.target.style.color = solid ? "var(--text-secondary)" : "rgba(255,255,255,0.8)"; }}
            >
              {label}
            </a>
          ))}
          <a href="#contact" className="btn-pill btn-dark btn-nav" onClick={(e) => go(e, "#contact")}
            style={{ marginLeft: "0.5rem" }}>
            Get Free Audit <span className="arrow">→</span>
          </a>
        </div>

        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            padding: "10px", minWidth: "44px", minHeight: "44px",
            flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: "22px", height: "2px",
              background: solid ? "#111" : "#fff", borderRadius: "2px",
              transition: "all 0.3s",
              transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Navigation menu"
          style={{
            position: "fixed", inset: 0, background: "#fff", zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "1.25rem",
            paddingTop: "calc(68px + 1.5rem)",
            paddingBottom: "2rem",
            overflowY: "auto",
          }}>
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={(e) => go(e, href)}
              style={{
                fontSize: "1.4rem", fontWeight: 700,
                letterSpacing: "0.05em",
                color: "#111", textDecoration: "none",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--orange)"}
              onMouseLeave={(e) => e.target.style.color = "#111"}
            >{label}</a>
          ))}
          <a href="#contact" className="btn-pill btn-dark" style={{ marginTop: "1rem" }} onClick={(e) => go(e, "#contact")}>Get Free Audit <span className="arrow">→</span></a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (max-width: 460px) {
          #mobile-menu .btn-pill {
            width: calc(100% - 2.5rem);
            max-width: 320px;
            justify-content: space-between;
          }
        }
      `}</style>
    </>
  );
}
