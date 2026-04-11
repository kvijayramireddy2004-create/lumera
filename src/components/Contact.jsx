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
              { icon: "📞", label: "Phone", content: (<><a href="tel:+919550800865" style={{ color: "#fff", textDecoration: "none" }}>+91 9550800865</a><br /><a href="tel:+919494929955" style={{ color: "#fff", textDecoration: "none" }}>+91 9494929955</a></>) },
              { icon: "✉️", label: "Email", content: (<a href="mailto:harshavardhanravana@lumeraenergy.in" style={{ color: "#fff", textDecoration: "none" }}>harshavardhanravana@lumeraenergy.in</a>) },
              { icon: "🌐", label: "Website", content: (<a href="https://lumeraenergy.in" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none" }}>lumeraenergy.in <span className="sr-only">(opens in new tab)</span></a>) },
            ].map(({ icon, label, content }) => (
              <div key={label} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", alignItems: "flex-start" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem",
                }}><span aria-hidden="true">{icon}</span></div>
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
