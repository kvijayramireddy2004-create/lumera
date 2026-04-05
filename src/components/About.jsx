import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  'Lumera Energy is a renewable energy company focused on supplying solar power to industrial consumers across India.',
  'We develop, own, and operate solar power plants and supply electricity directly to industries through long-term Power Purchase Agreements (PPA).',
  'Our goal: build a new energy ecosystem where industries access affordable, predictable renewable power — enabling sustainable manufacturing while reducing exposure to rising electricity costs.',
]

export default function About() {
  const sRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-img', {
        scrollTrigger: { trigger: '.about-img', start: 'top 82%' },
        opacity: 0, x: -60, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.about-text-block', {
        scrollTrigger: { trigger: '.about-text-block', start: 'top 82%' },
        opacity: 0, x: 60, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.about-feat', {
        scrollTrigger: { trigger: '.about-feat', start: 'top 85%' },
        opacity: 0, y: 25, stagger: 0.14, duration: 0.65, ease: 'power3.out',
      })
    }, sRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sRef} className="section-py" style={{ background: '#FFFFFF' }}>
      <div className="about-grid" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

        {/* Image */}
        <div className="about-img" style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.14)' }}>
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80"
            alt="Solar Farm"
            className="about-img-el" style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
          {/* Orange gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(249,115,22,0.18), transparent 60%)' }} />
          {/* Float card */}
          <div style={{
            position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem',
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)',
            borderRadius: '14px', padding: '1.1rem 1.4rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid rgba(249,115,22,0.15)',
          }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0,
              background: 'linear-gradient(135deg,#F97316,#EA580C)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
            }}>☀️</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0C1220' }}>Solar Power Plants</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.15rem' }}>Developed, Owned &amp; Operated by Lumera</div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="about-text-block">
          <div className="sec-label">About Lumera Energy</div>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 'clamp(2.4rem,4.5vw,3.6rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '1.8rem' }}>
            We Power <span className="grad-text">Industries</span><br />With Clean Solar
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="about-feat" style={{
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                padding: '1rem 0', borderBottom: i < FEATURES.length - 1 ? '1px solid #F1F5F9' : 'none',
              }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F97316', marginTop: '7px', flexShrink: 0 }} />
                <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.75 }}>{f}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-primary"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Start Your Energy Journey &nbsp;→
            </a>
            <a href="#solution" className="btn-secondary"
              onClick={(e) => { e.preventDefault(); document.querySelector('#solution')?.scrollIntoView({ behavior: 'smooth' }) }}>
              See Our Solution
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
