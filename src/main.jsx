import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App'

gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis smooth scroll and connect to GSAP
const lenis = new Lenis({
  duration: 1.3,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

// Sync Lenis with GSAP ticker
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Expose for ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
