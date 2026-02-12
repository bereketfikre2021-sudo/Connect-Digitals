import React, { useState, useEffect } from 'react'

export default function FloatingNavigation() {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const percentage = documentHeight > 0 ? Math.round((scrollY / documentHeight) * 100) : 0
      setScrollPercentage(Math.min(percentage, 100))
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const progressCircle = (r = 14) => {
    const circumference = 2 * Math.PI * r
    return circumference
  }

  const combinedProgressButton = () => {
    const r = 14
    const circ = progressCircle(r)
    return (
      <button
        onClick={scrollToTop}
        className="group relative rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 bg-primaryNavy text-white w-12 h-12 sm:w-14 sm:h-14 overflow-hidden"
        aria-label={`Scroll to top · Page progress: ${scrollPercentage}%`}
      >
        <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r={r} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20" />
          <circle 
            cx="18" cy="18" r={r} 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeDasharray={`${(scrollPercentage / 100) * circ} ${circ}`}
            strokeLinecap="round"
            className="text-white/60 transition-all duration-200 ease-out"
          />
        </svg>
        <svg 
          className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    )
  }

  return (
    <>
      {/* Page progress bar - visible on all screen sizes (mobile, tablet, desktop) */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/20 backdrop-blur-sm z-[60]">
        <div 
          className="h-full bg-primaryNavy/80 transition-all duration-150 ease-out" 
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>

      {/* Mobile & Tablet: Combined progress + scroll-to-top on left, Call button on right */}
      <div className="fixed left-4 bottom-4 z-50 lg:hidden">
        {combinedProgressButton()}
      </div>

      <a
        href="tel:+251923988838"
        className="group relative fixed right-4 bottom-4 z-50 lg:hidden bg-accentRed text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 overflow-hidden"
        aria-label="Call +251 923 988 838"
      >
        <span className="relative z-10 block">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        </span>
        <div className="absolute inset-0 bg-primaryNavy transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
      </a>

      {/* Desktop: Combined progress + scroll-to-top on right */}
      <div className="fixed right-4 bottom-4 z-50 hidden lg:block">
        {combinedProgressButton()}
      </div>
    </>
  )
}
