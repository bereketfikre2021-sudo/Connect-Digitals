import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import QuoteModal from './components/QuoteModal'
import PricingModal from './components/PricingModal'
import PerformanceMonitor from './components/PerformanceMonitor'
import { verifyImages } from './utils/imageVerification'

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false)

  // Verify images on app load
  useEffect(() => {
    if (import.meta.env.PROD) {
      verifyImages().then(results => {
        const failed = results.filter(r => !r.accessible)
        if (failed.length > 0) {
          console.warn('Some images failed to load after deployment:', failed)
        } else {
          console.log('All images loaded successfully after deployment!')
        }
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <PerformanceMonitor />
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      <main>
        <Home
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onOpenPricingModal={() => setIsPricingModalOpen(true)}
        />
      </main>
      <Footer key={`footer-${Date.now()}`} />
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </div>
  )
}
