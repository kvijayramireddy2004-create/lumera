import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ProblemSolution from './components/ProblemSolution'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <ProblemSolution />
        <HowItWorks />
        <Benefits />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
