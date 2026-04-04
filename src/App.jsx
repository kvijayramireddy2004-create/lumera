import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import About           from './components/About'
import ProblemSolution from './components/ProblemSolution'
import HowItWorks      from './components/HowItWorks'
import Benefits        from './components/Benefits'
import WhyLumera       from './components/WhyLumera'
import Contact         from './components/Contact'
import Footer          from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ProblemSolution />
        <HowItWorks />
        <Benefits />
        <WhyLumera />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
