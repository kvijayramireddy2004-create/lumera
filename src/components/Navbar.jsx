import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { label: 'About',        href: '#about'   },
  { label: 'Solution',     href: '#solution' },
  { label: 'How It Works', href: '#hiw'     },
  { label: 'Benefits',     href: '#benefits' },
  { label: 'Why Lumera',   href: '#why'     },
]

const styles = {
  nav: (solid) => ({
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    padding: solid ? '0.85rem 5rem' : '1.4rem 5rem',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: solid ? 'rgba(255,255,255,0.92)' : 'transparent',
    backdropFilter: solid ? 'blur(22px)' : 'none',
    WebkitBackdropFilter: solid ? 'blur(22px)' : 'none',
    borderBottom: solid ? '1px solid rgba(249,115,22,0.1)' : '1px solid transparent',
    boxShadow: solid ? '0 2px 24px rgba(0,0,0,0.06)' : 'none',
    transition: 'all 0.38s cubic-bezier(0.4,0,0.2,1)',
  }),
  logoWrap: {
    display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none',
  },
  logoText: (solid) => ({
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '1.32rem', fontWeight: 800, letterSpacing: '0.07em',
    color: solid ? '#0C1220' : '#FFFFFF',
    transition: 'color 0.38s',
  }),
  links: { display: 'flex', gap: '2.2rem', listStyle: 'none', alignItems: 'center' },
  link: (solid) => ({
    color: solid ? '#334155' : 'rgba(255,255,255,0.75)',
    textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
    letterSpacing: '0.03em', transition: 'color 0.25s', position: 'relative',
  }),
}

export default function Navbar() {
  const [solid, setSolid]   = useState(false)
  const [hovered, setHover] = useState(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav style={styles.nav(solid)}>
      {/* Logo */}
      <a href="#home" style={styles.logoWrap} onClick={(e) => handleAnchor(e, '#home')}>
        <svg width="36" height="36" viewBox="0 0 46 46" fill="none">
          <path d="M8 40 L22 7 L32 22 H25 L37 40 Z" fill={solid ? '#1B2E52' : 'rgba(255,255,255,0.9)'} />
          <path d="M25 5 L38 1 L31 20 Z" fill="#FCD34D" />
          <path d="M22 7 L31 20 L25 5 Z" fill="#F97316" />
        </svg>
        <span style={styles.logoText(solid)}>
          LUMERA <span style={{ color: '#F97316' }}>ENERGY</span>
        </span>
      </a>

      {/* Links */}
      <ul style={styles.links}>
        {LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                ...styles.link(solid),
                color: hovered === href
                  ? '#F97316'
                  : solid ? '#334155' : 'rgba(255,255,255,0.75)',
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
        style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
        onClick={(e) => handleAnchor(e, '#contact')}
      >
        Get Free Audit
      </a>
    </nav>
  )
}
