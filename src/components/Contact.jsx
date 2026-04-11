import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_g406wwv";
const EMAILJS_TEMPLATE_ID = "template_dk7rrkf";
const EMAILJS_PUBLIC_KEY = "OX29iNzgTyt3wL_Sh";

const CONSUMPTION_OPTIONS = [
  "Below 50,000 kWh / month",
  "50,000 – 2,00,000 kWh / month",
  "2,00,000 – 5,00,000 kWh / month",
  "Above 5,00,000 kWh / month",
];

function Field({ label, htmlFor, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label htmlFor={htmlFor} style={{
        fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.5)",
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}>{label}</label>
      {children}
    </div>
  );
}

export default function Contact() {
  const formRef = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => { setLoading(false); setSent(true); formRef.current.reset(); setTimeout(() => setSent(false), 6000); })
      .catch(() => { setLoading(false); setError(true); setTimeout(() => setError(false), 5000); });
  };

  return (
    <section id="contact" className="section section--dark">
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "550px", margin: "0 auto 4rem" }}>
          <div className="eyebrow">Partner With Us</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95, marginBottom: "1rem" }}>
            Let's Build A <span className="grad-text">Smarter Energy</span> Future
          </h2>
          <p style={{ color: "var(--text-white-muted)", fontSize: "0.95rem", lineHeight: 1.75 }}>
            Get a free energy audit and discover exactly how much your industry can save with Lumera.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "4rem", alignItems: "start" }} className="contact-grid">

          {/* Info */}
          <div>
            <h3 style={{
              fontSize: "1.1rem",
              fontWeight: 700, marginBottom: "2rem", lineHeight: 1.3,
            }}>Reach Us Directly</h3>

            {[
              { icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              ), label: "Phone", content: (<><a href="tel:+919550800865" style={{ color: "#fff", textDecoration: "none" }}>+91 9550800865</a><br /><a href="tel:+919494929955" style={{ color: "#fff", textDecoration: "none" }}>+91 9494929955</a></>) },
              { icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4l-10 8L2 4" />
                </svg>
              ), label: "Email", content: (<a href="mailto:harshavardhanravana@lumeraenergy.in" style={{ color: "#fff", textDecoration: "none" }}>harshavardhanravana@lumeraenergy.in</a>) },
              { icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              ), label: "Website", content: (<a href="https://lumeraenergy.in" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none" }}>lumeraenergy.in <span className="sr-only">(opens in new tab)</span></a>) },
            ].map(({ icon, label, content }) => (
              <div key={label} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", alignItems: "flex-start" }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "12px", flexShrink: 0,
                  background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }} aria-hidden="true">{icon}</div>
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-white-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{label}</div>
                  <div style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>{content}</div>
                </div>
              </div>
            ))}

            <div style={{
              marginTop: "2rem", padding: "1.4rem", borderRadius: "14px",
              background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)",
            }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--orange)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Free Energy Audit</div>
              <p style={{ fontSize: "0.84rem", color: "var(--text-white-muted)", lineHeight: 1.7 }}>
                We'll analyze your electricity bills and show you exactly how much you can save — completely free, zero commitment.
              </p>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
              <Field label="Company Name *" htmlFor="company">
                <input id="company" className="form-input" type="text" name="company" placeholder="Your company name" required />
              </Field>
              <Field label="Contact Person *" htmlFor="name">
                <input id="name" className="form-input" type="text" name="name" placeholder="Your full name" required />
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
              <Field label="Email Address *" htmlFor="email">
                <input id="email" className="form-input" type="email" name="email" placeholder="email@company.com" required />
              </Field>
              <Field label="Phone Number *" htmlFor="phone">
                <input id="phone" className="form-input" type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required />
              </Field>
            </div>
            <Field label="Monthly Electricity Consumption" htmlFor="consumption">
              <select id="consumption" className="form-input" name="consumption" defaultValue="">
                <option value="" disabled>Select range — helps us prepare your audit</option>
                {CONSUMPTION_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
              </select>
            </Field>
            <Field label="Message" htmlFor="message">
              <textarea id="message" className="form-input" name="message" rows={4} placeholder="Tell us about your energy needs…" style={{ resize: "vertical" }} />
            </Field>
            <button
              type="submit" disabled={loading} aria-busy={loading}
              className="btn-pill btn-orange"
              style={{
                width: "100%", justifyContent: "center",
                background: sent ? "#22c55e" : error ? "#ef4444" : undefined,
              }}
            >
              {loading ? "Sending…" : sent ? "✓ Sent! We'll contact you within 24 hours." : error ? "✗ Failed. Please try again." : <>Send Enquiry <span className="arrow">→</span></>}
            </button>
            <div aria-live="polite" className="sr-only">
              {loading ? "Sending your enquiry..." : sent ? "Enquiry sent successfully." : error ? "Failed to send. Please try again." : ""}
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
