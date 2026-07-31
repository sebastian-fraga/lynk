import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import SupportedPlatforms from './components/SupportedPlatforms'

import './App.css'

function App() {

  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 197, 94, 0.25), transparent 70%), #000000",
        }}
      />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <main className="flex flex-col flex-1 items-center justify-center pt-20px-4 text-white gap-6">
          <Hero />
          <SupportedPlatforms />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
