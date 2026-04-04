import { useRef, useEffect, useState, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WhyScene = lazy(() => import('../three/WhyScene'))

const FEATURES = [
  {
    num: '01',
    title: 'End-to-End Power Structuring',
    desc:  'From site assessment and plant design to long-term power supply — fully managed, nothing outsourced. Not just an installation company.',
  },
  {
    num: '02',
    title: 'Commercial Optimization',
    desc:  'Contracts engineered to maximize your savings over the long term — structured to grow with your business, not just a one-time deal.',
  },
  {
    num: '03',
    title: 'Flexible Sourcing',
    desc:  'Solutions tailored to your specific energy consumption profile, industry type, geographic location, and regulatory environment.',
  },
]

function FeatureCard({ num, title, desc }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      className="why-feat"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', gap: '1.2rem', alignItems: 'flex-start',
        padding: '1.4rem 1.5rem', borderRadius: '16px',
        background: hov ? '#FFFBEB' : '#fff',
        border: `1px solid ${hov ? '#F97316' : '#F1F5F9'}`,
        transition: 'all 0.3s ease',
        transform: hov ? 'translateX(8px)' : 'translateX(0)',
        boxShadow: hov ? '0 8px 32px rgba(249,115,22,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
        cursor: 'default',
      }}
    >
      <div style={{
        fontFamily: "'Barlow Condensed',sans-serif", fontSize: '2.2rem', fontWeight: 900,
        color: hov ? 'rgba(249,115,22,0.45)' : 'rgba(249,115,22,0.2)',
        lineHeight: 1, flexShrink: 0, width: '2.8rem', transition: 'color 0.3s',
      }}>{num}</div>
      <div>
        <div style={{ fontSize: '0.97rem', fontWeight: 700, color: '#0C1220', marginBottom: '0.35rem' }}>{title}</div>
        <div style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.7 }}>{desc}</div>
      </div>
    </div>
  )
}

export default function WhyLumera() {
  const sRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-canvas-box', {
        scrollTrigger: { trigger: '.why-canvas-box', start: 'top 82%' },
        opacity: 0, x: -55, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.why-text', {
        scrollTrigger: { trigger: '.why-text', start: 'top 82%' },
        opacity: 0, x: 55, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.why-feat', {
        scrollTrigger: { trigger: '.why-feat', start: 'top 86%' },
        opacity: 0, y: 35, stagger: 0.14, duration: 0.7, ease: 'power3.out',
      })
    }, sRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="why" ref={sRef} style={{ background: '#fff', padding: '7rem 5rem' }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center',
      }}>

        {/* 3D Canvas box */}
        <div className="why-canvas-box" style={{
          height: '440px', borderRadius: '20px', overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(249,115,22,0.12)',
          border: '1px solid #FED7AA',
        }}>
          <Suspense fallback={
            <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#FFF7ED,#FFFBEB)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ fontSize:'3rem' }}>☀️</div>
            </div>
          }>
            <WhyScene />
          </Suspense>
        </div>

        {/* Text */}
        <div className="why-text">
          <div className="sec-label">Our Difference</div>
          <h2 style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: 'clamp(2.4rem,4.5vw,3.6rem)', fontWeight: 900,
            textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '1.2rem',
          }}>
            Not Just Solar.<br />
            <span className="grad-text">A Complete<br />Energy Partnership.</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.78, marginBottom: '2.2rem' }}>
            Unlike traditional solar installers who sell panels and leave, Lumera provides an end-to-end energy partnership that maximizes your savings over decades.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FEATURES.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
