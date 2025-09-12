import React, { useState, useEffect } from 'react'

export default function Header({ onOpenQuoteModal }){
  const [isScrolled, setIsScrolled] = useState(false)
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' 
        : 'bg-white/80 backdrop-blur-md border-b border-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-4 hover:opacity-80 transition-all duration-300 group"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-lg group-hover:ring-primaryNavy transition-all duration-300">
                <img 
                  src="/img/Connect.webp" 
                  alt="Connect Digitals Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accentRed rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-lg text-primaryNavy group-hover:text-accentRed transition-colors duration-300">
                Connect Digitals
              </div>
              <div className="text-xs text-gray-500 font-medium tracking-wide">
                Connect. Create. Captivate.
              </div>
            </div>
          </button>

          {/* Navigation & CTA */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('about')} 
                className="relative text-gray-700 hover:text-primaryNavy transition-all duration-300 font-medium group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryNavy transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="relative text-gray-700 hover:text-primaryNavy transition-all duration-300 font-medium group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryNavy transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="relative text-gray-700 hover:text-primaryNavy transition-all duration-300 font-medium group"
              >
                Portfolio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryNavy transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="relative text-gray-700 hover:text-primaryNavy transition-all duration-300 font-medium group"
              >
                Testimonials
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryNavy transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="relative text-gray-700 hover:text-primaryNavy transition-all duration-300 font-medium group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryNavy transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>


            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-gray-700 hover:text-primaryNavy transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Hidden for now - can be implemented later) */}
      <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-left text-gray-700 hover:text-primaryNavy transition-colors font-medium py-2"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-left text-gray-700 hover:text-primaryNavy transition-colors font-medium py-2"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="text-left text-gray-700 hover:text-primaryNavy transition-colors font-medium py-2"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-left text-gray-700 hover:text-primaryNavy transition-colors font-medium py-2"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-left text-gray-700 hover:text-primaryNavy transition-colors font-medium py-2"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
