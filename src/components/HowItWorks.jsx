import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '01', icon: '🏗️', title: 'Lumera Builds',     desc: 'We develop and own a solar power plant sized precisely for your industrial consumption profile.' },
  { num: '02', icon: '⚡', title: 'Power Generated',    desc: 'Clean solar electricity is generated consistently and reliably at scale, year-round.' },
  { num: '03', icon: '🏭', title: 'Supplied to You',    desc: 'Electricity flows directly to your industrial facility without interruption.' },
  { num: '04', icon: '📋', title: 'PPA Agreement',      desc: 'You pay a stable, pre-agreed tariff through a long-term Power Purchase Agreement.' },
]

function Step({ num, icon, title, desc, index }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      className="hiw-step"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
    >
      {/* Circle */}
      <div style={{
        width: '60px', height: '60px', borderRadius: '50%',
        border: `2px solid ${hov ? '#F97316' : '#FED7AA'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Barlow Condensed',sans-serif", fontSize: '1.35rem', fontWeight: 700,
        color: hov ? '#fff' : '#F97316',
        background: hov ? '#F97316' : '#fff',
        position: 'relative', zIndex: 1, marginBottom: '1.4rem',
        transition: 'all 0.3s ease',
        boxShadow: hov ? '0 0 0 8px rgba(249,115,22,0.12)' : '0 0 0 0px transparent',
      }}>
        {num}
      </div>
      <div style={{ fontSize: '2rem', marginBottom: '0.9rem' }}>{icon}</div>
      <div style={{
        fontFamily: "'Barlow Condensed',sans-serif", fontSize: '1.05rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0C1220', marginBottom: '0.5rem',
      }}>{title}</div>
      <div style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.65, maxWidth: '180px' }}>{desc}</div>
    </div>
  )
}

export default function HowItWorks() {
  const sRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hiw-header', {
        scrollTrigger: { trigger: '.hiw-header', start: 'top 82%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
      })
      gsap.from('.hiw-step', {
        scrollTrigger: { trigger: '.hiw-step', start: 'top 85%' },
        opacity: 0, y: 50, stagger: 0.16, duration: 0.75, ease: 'power3.out',
      })
      gsap.from('.hiw-line', {
        scrollTrigger: { trigger: '.hiw-line', start: 'top 80%' },
        scaleX: 0, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'left center',
      })
      gsap.from('.hiw-footer', {
        scrollTrigger: { trigger: '.hiw-footer', start: 'top 88%' },
        opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
      })
    }, sRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hiw" ref={sRef} style={{ background: '#FFFFFF', padding: '7rem 5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div className="hiw-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>The Process</div>
          <h2 style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: 'clamp(2.4rem,4.5vw,3.6rem)', fontWeight: 900,
            textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '1rem',
          }}>
            How It <span className="grad-text">Works</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
            A streamlined 4-step model that gives your industry clean power with zero complexity or capital risk.
          </p>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Connector line */}
          <div className="hiw-line" style={{
            position: 'absolute', top: '29px',
            left: 'calc(12.5% + 30px)', right: 'calc(12.5% + 30px)',
            height: '1.5px',
            background: 'linear-gradient(to right, #F97316, rgba(249,115,22,0.15))',
          }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {STEPS.map((s, i) => <Step key={i} {...s} index={i} />)}
          </div>
        </div>

        {/* Footer note */}
        <p className="hiw-footer" style={{
          textAlign: 'center', marginTop: '3rem',
          color: '#94A3B8', fontSize: '0.88rem', fontStyle: 'italic',
        }}>
          This allows industries to reduce operational energy costs without any capital investment.
        </p>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href="#contact" className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Get Your Free Energy Audit &nbsp;→
          </a>
        </div>
      </div>
    </section>
  )
}
