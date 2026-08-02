import { useState } from 'react';

import Header from './components/Header'
import HistoryModal from "./components/HistoryModal";
import Hero from './components/Hero'
import Footer from './components/Footer'
import SupportedPlatforms from './components/SupportedPlatforms'

import './App.css'

function App() {
  const [historyOpen, setHistoryOpen] = useState(false)
  const [historyUrl, setHistoryUrl] = useState("");

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-white dark:bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "var(--background)",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header onOpenHistory={() => setHistoryOpen(true)} />

        <HistoryModal
          open={historyOpen}
          onClose={() => setHistoryOpen(false)}
          onHistorySelect={(url) => setHistoryUrl(url)}
        />

        <main className="flex flex-col flex-1 items-center justify-center pt-20 px-4 text-black dark:text-white sm:gap-6 gap-12">
          <Hero historyUrl={historyUrl} />
          <SupportedPlatforms />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App