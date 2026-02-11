import React, { useState, useEffect } from 'react'

export default function FloatingNavigation() {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const percentage = Math.round((scrollY / documentHeight) * 100)
      setScrollPercentage(Math.min(percentage, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Left Side - Mobile only: Minimal progress bar (hidden on tablet/desktop) */}
      <div className="fixed left-4 bottom-4 z-50 md:hidden">
        {/* Mobile: Glassmorphism progress bar */}
        <div className="w-12 h-1.5 bg-white/20 backdrop-blur-md rounded-full overflow-hidden border border-white/30">
          <div 
            className="h-full bg-primaryNavy/70 backdrop-blur-sm rounded-full transition-all duration-150 ease-out border border-primaryNavy/30" 
            style={{ width: `${scrollPercentage}%` }}
          />
        </div>
      </div>

      {/* Right Side - Home Arrow */}
      <div className="fixed right-4 bottom-4 z-50">
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
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            Back to Top
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </button>
      </div>
    </>
  )
}
