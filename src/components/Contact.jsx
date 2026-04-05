import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID = "service_g406wwv";
const EMAILJS_TEMPLATE_ID = "template_dk7rrkf";
const EMAILJS_PUBLIC_KEY = "OX29iNzgTyt3wL_Sh";

const CONTACT_ITEMS = [
  { icon: "📞", label: "Phone", value: "+91 9550800865\n+91 9494929955" },
  { icon: "✉️", label: "Email", value: "harshavardhanravana@lumeraenergy.in" },
  { icon: "🌐", label: "Website", value: "lumeraenergy.in" },
];

const CONSUMPTION_OPTIONS = [
  "Select range — helps us prepare your audit",
  "Below 50,000 kWh / month",
  "50,000 – 2,00,000 kWh / month",
  "2,00,000 – 5,00,000 kWh / month",
  "Above 5,00,000 kWh / month",
];

function FormField({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.38rem" }}>
      <label
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "#94A3B8",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const sRef = useRef();
  const formRef = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-header", {
        scrollTrigger: { trigger: ".contact-header", start: "top 82%" },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".contact-info", {
        scrollTrigger: { trigger: ".contact-info", start: "top 82%" },
        opacity: 0,
        x: -50,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".contact-form", {
        scrollTrigger: { trigger: ".contact-form", start: "top 82%" },
        opacity: 0,
        x: 50,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSent(true);
        formRef.current.reset();
        setTimeout(() => setSent(false), 6000);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
        setTimeout(() => setError(false), 5000);
      });
  };

  return (
    <section
      id="contact"
      ref={sRef}
      className="section-py"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0C1220 0%, #1E3A5F 50%, #0C2040 100%)",
      }}
    >
      {/* Decorative orbs */}
      <div
        style={{
          position: "absolute",
          width: "440px",
          height: "440px",
          borderRadius: "50%",
          background: "rgba(249,115,22,0.12)",
          filter: "blur(100px)",
          top: "-120px",
          right: "-100px",
          pointerEvents: "none",
          animation: "drift 9s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "rgba(245,158,11,0.1)",
          filter: "blur(90px)",
          bottom: "-80px",
          left: "-80px",
          pointerEvents: "none",
          animation: "drift 11s ease-in-out infinite alternate-reverse",
        }}
      />

      <style>{`
        @keyframes drift { to { transform: translate(30px, 30px); } }
      `}</style>

      <div
        style={{
          maxWidth: "1060px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          className="contact-header"
          style={{ textAlign: "center", marginBottom: "4.5rem" }}
        >
          <div
            className="sec-label"
            style={{ justifyContent: "center", color: "#F59E0B" }}
          >
            <span style={{ background: "#F59E0B" }} />
            Get In Touch
          </div>
          <h2
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: "clamp(2.4rem,4.5vw,3.6rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Let's Build A{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F97316,#FCD34D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Smarter Energy
            </span>
            <br />
            Future Together
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.52)",
              fontSize: "0.95rem",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Get a free energy audit and discover exactly how much your industry
            can save with Lumera.
          </p>
        </div>

        {/* Grid */}
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Contact info */}
          <div className="contact-info">
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "1.8rem",
              }}
            >
              Reach Us Directly
            </h3>
            {CONTACT_ITEMS.map(({ icon, label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  marginBottom: "1.3rem",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    flexShrink: 0,
                    background: "rgba(249,115,22,0.12)",
                    border: "1px solid rgba(249,115,22,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                  }}
                >
                  {icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.88rem",
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {value}
                  </div>
                </div>
              </div>
            ))}

            {/* Free audit badge */}
            <div
              style={{
                marginTop: "2.2rem",
                padding: "1.4rem",
                borderRadius: "14px",
                background: "rgba(249,115,22,0.09)",
                border: "1px solid rgba(249,115,22,0.22)",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#FCD34D",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Free Energy Audit
              </div>
              <div
                style={{
                  fontSize: "0.84rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7,
                }}
              >
                We'll analyze your electricity bills and show you exactly how
                much you can save — completely free, zero commitment required.
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <FormField label="Company Name *">
                <input
                  className="form-input"
                  type="text"
                  name="company"
                  placeholder="Your company name"
                  required
                />
              </FormField>
              <FormField label="Contact Person *">
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </FormField>
            </div>
            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <FormField label="Email Address *">
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="email@company.com"
                  required
                />
              </FormField>
              <FormField label="Phone Number *">
                <input
                  className="form-input"
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </FormField>
            </div>
            <FormField label="Monthly Electricity Consumption">
              <select
                className="form-input"
                name="consumption"
                style={{ background: "#fff" }}
              >
                {CONSUMPTION_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Message">
              <textarea
                className="form-input"
                name="message"
                rows={4}
                placeholder="Tell us about your energy needs or ask anything…"
                style={{ resize: "vertical" }}
              />
            </FormField>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "1rem",
                fontSize: "1rem",
                letterSpacing: "0.02em",
                background: sent
                  ? "linear-gradient(135deg,#22C55E,#16A34A)"
                  : error
                  ? "linear-gradient(135deg,#EF4444,#DC2626)"
                  : "linear-gradient(135deg,#F97316,#EA580C)",
                boxShadow: sent
                  ? "0 8px 32px rgba(34,197,94,0.4)"
                  : error
                  ? "0 4px 22px rgba(239,68,68,0.4)"
                  : "0 4px 22px rgba(249,115,22,0.35)",
              }}
            >
              {loading
                ? "Sending…"
                : sent
                ? "✓ Sent! We'll contact you within 24 hours."
                : error
                ? "✗ Failed to send. Please try again."
                : "Send Enquiry →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
