import { useRef, useState, useEffect } from "react";

const IMAGE_URL = "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=85";

function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

export default function About() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setProgress(0); return; }

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const triggerStart = window.innerHeight * 0.3;
      const triggerEnd = -rect.height * 0.3;
      const raw = (triggerStart - rect.top) / (triggerStart - triggerEnd);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const radius = lerp(20, 0, progress);
  const scale = lerp(1, 1.08, progress);
  const expandX = lerp(0, 1, progress);

  const sectionPadX =
    typeof window !== "undefined"
      ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--section-x")) || 0
      : 0;

  return (
    <section id="about" ref={sectionRef} style={{ background: "var(--bg-warm)", overflow: "visible" }}>
      {/* Text + Image grid */}
      <div className="section" style={{ paddingBottom: "3rem" }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "6rem", alignItems: "center",
          }} className="about-grid">

            {/* Text */}
            <div>
              <div className="eyebrow">About Lumera Energy</div>
              <h2 style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.05, marginBottom: "2rem",
              }}>
                We Power <span className="grad-text">Industries</span> With Clean Solar
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
                <a href="#contact" className="btn-pill btn-dark"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                  Start Your Journey <span className="arrow">→</span>
                </a>
                <a href="#solution" className="btn-pill btn-outline"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#solution")?.scrollIntoView({ behavior: "smooth" }); }}>
                  See Our Solution <span className="arrow">→</span>
                </a>
              </div>
            </div>

            {/* Image placeholder for grid spacing */}
            <div style={{ position: "relative" }}>
              <div style={{ paddingBottom: "110%", borderRadius: `${radius}px`, overflow: "hidden", position: "relative" }}>
                <img
                  src={IMAGE_URL}
                  alt="Industrial solar power plant with rows of panels powering manufacturing facilities"
                  loading="lazy"
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                    transform: `scale(${scale})`,
                    transition: "transform 0.1s linear",
                  }}
                />
                <div style={{
                  position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem",
                  background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)",
                  borderRadius: "14px", padding: "1.2rem 1.4rem",
                  display: "flex", alignItems: "center", gap: "1rem",
                  opacity: 1 - progress * 2.5,
                  transition: "opacity 0.1s linear",
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
        </div>
      </div>

      {/* Full-width expanding image */}
      <div
        ref={imageWrapRef}
        style={{
          marginLeft: `calc(-1 * var(--section-x) * ${expandX})`,
          marginRight: `calc(-1 * var(--section-x) * ${expandX})`,
          borderRadius: `${radius}px`,
          overflow: "hidden",
          height: "clamp(300px, 50vw, 600px)",
          position: "relative",
          transition: "margin 0.05s linear, border-radius 0.05s linear",
        }}
      >
        <img
          src={IMAGE_URL}
          alt=""
          aria-hidden="true"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            transform: `scale(${lerp(1, 1.15, progress)})`,
            transition: "transform 0.1s linear",
          }}
        />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, var(--bg-warm), transparent 30%, transparent 70%, var(--bg-warm))`,
          opacity: 1 - progress,
          transition: "opacity 0.1s linear",
        }} />
      </div>

      <div style={{ height: "4rem" }} />

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
