import React, { useState, useEffect } from 'react'

export default function FloatingNavigation() {
  const [currentSection, setCurrentSection] = useState('hero')

  // Track current section
  useEffect(() => {
    const sections = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'contact']
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const sectionTop = section.offsetTop - 100
          if (scrollY >= sectionTop) {
            setCurrentSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sections = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👥' },
    { id: 'services', label: 'Services', icon: '⚡' },
    { id: 'portfolio', label: 'Portfolio', icon: '💼' },
    { id: 'testimonials', label: 'Reviews', icon: '⭐' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ]

  return (
    <>
      {/* Left Side - Section Navigation */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 p-2">
          <div className="flex flex-col space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`group relative p-3 rounded-xl transition-all duration-300 ${
                  currentSection === section.id
                    ? 'bg-primaryNavy text-white shadow-lg'
                    : 'text-gray-600 hover:text-primaryNavy hover:bg-gray-50'
                }`}
                aria-label={`Navigate to ${section.label} section`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-lg">{section.icon}</span>
                  <span className="text-xs font-medium">{section.label}</span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {section.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </button>
            ))}
          </div>
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
