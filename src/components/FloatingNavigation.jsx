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

  const scrollToTopButton = (tooltipLeft = false) => (
    <button
      onClick={scrollToTop}
      className="group relative bg-primaryNavy text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      aria-label="Scroll to top"
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
      
      {/* Tooltip - right of button when on left (mobile), left of button when on right (desktop) */}
      <div className={`absolute top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap ${tooltipLeft ? 'left-full ml-3' : 'right-full mr-3'}`}>
        Back to Top
        <div className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 ${tooltipLeft ? 'left-0 -translate-x-1' : 'right-0 translate-x-1'}`}></div>
      </div>
    </button>
  )

  return (
    <>
      {/* Page progress bar - visible on all screen sizes (mobile, tablet, desktop) */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/20 backdrop-blur-sm z-[60]">
        <div 
          className="h-full bg-primaryNavy/80 transition-all duration-150 ease-out" 
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>

      {/* Mobile & Tablet: Home arrow on left, Call button on right */}
      <div className="fixed left-4 bottom-4 z-50 lg:hidden">
        {scrollToTopButton(true)}
      </div>

      <a
        href="tel:+251923988838"
        className="fixed right-4 bottom-4 z-50 lg:hidden bg-accentRed text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Call +251 923 988 838"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </a>

      {/* Desktop: Page progress on left, Home arrow on right */}
      <div className="fixed left-4 bottom-4 z-50 hidden lg:flex items-center gap-2">
        <div 
          className="group relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
          aria-label={`Page progress: ${scrollPercentage}%`}
        >
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20" />
            <circle 
              cx="18" cy="18" r="16" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeDasharray={`${(scrollPercentage / 100) * 100.53} 100.53`}
              strokeLinecap="round"
              className="text-primaryNavy transition-all duration-150"
            />
          </svg>
          <span className="absolute text-[10px] font-semibold text-primaryNavy">{scrollPercentage}%</span>
        </div>
      </div>

      <div className="fixed right-4 bottom-4 z-50 hidden lg:block">
        {scrollToTopButton(false)}
      </div>
    </>
  )
}
