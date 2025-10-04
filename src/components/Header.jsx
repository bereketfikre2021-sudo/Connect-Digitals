import React, { useState, useEffect } from 'react'

export default function Header({ onOpenQuoteModal }){
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' 
          : 'bg-white/80 backdrop-blur-md border-b border-gray-100'
      }`}
      role="banner"
    >
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-4 hover:opacity-80 transition-all duration-300 group"
            aria-label="Connect Digitals - Go to homepage"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-lg group-hover:ring-primaryNavy transition-all duration-300">
                <img 
                  src="/img/Connect.webp" 
                  alt="Connect Digitals - Professional Graphic Design and Branding Agency Logo" 
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchpriority="high"
                  decoding="sync"
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
              <div className="text-xs text-gray-500 font-medium tracking-wide font-sans">
                Connect. Create. Captivate.
              </div>
            </div>
          </button>

          {/* Navigation & CTA */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
              <button 
                onClick={() => scrollToSection('about')} 
                className="relative text-gray-700 hover:text-primaryNavy transition-all duration-300 font-medium group font-sans"
                aria-label="Navigate to About section"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryNavy transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="relative text-gray-700 hover:text-primaryNavy transition-all duration-300 font-medium group font-sans"
                aria-label="Navigate to Services section"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryNavy transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="relative text-gray-700 hover:text-primaryNavy transition-all duration-300 font-medium group font-sans"
                aria-label="Navigate to Portfolio section"
              >
                Portfolio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryNavy transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="relative text-gray-700 hover:text-primaryNavy transition-all duration-300 font-medium group font-sans"
                aria-label="Navigate to Testimonials section"
              >
                Testimonials
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryNavy transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="relative text-gray-700 hover:text-primaryNavy transition-all duration-300 font-medium group font-sans"
                aria-label="Navigate to Contact section"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryNavy transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>


            {/* Mobile Menu Button - Fancy Design - CACHE BUSTER v4 */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden relative p-3 rounded-full bg-gradient-to-br from-primaryNavy/5 to-accentRed/5 hover:from-primaryNavy/10 hover:to-accentRed/10 transition-all duration-300 group"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {/* Animated Background Ring */}
              <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
                isMobileMenuOpen 
                  ? 'border-primaryNavy/30 scale-110' 
                  : 'border-transparent group-hover:border-primaryNavy/20'
              }`}></div>
              
              {/* Burger Icon with Smooth Animation */}
              <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-primaryNavy transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-primaryNavy transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-primaryNavy transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`}></span>
              </div>
              
              {/* Subtle Glow Effect */}
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isMobileMenuOpen 
                  ? 'bg-gradient-to-br from-primaryNavy/10 to-accentRed/10' 
                  : 'bg-transparent group-hover:bg-gradient-to-br group-hover:from-primaryNavy/5 group-hover:to-accentRed/5'
              }`}></div>
              
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Enhanced Design */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-navigation"
          className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg transition-all duration-300 shadow-lg"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="max-w-6xl mx-auto px-6 py-6">
            <nav className="flex flex-col space-y-1">
              {[
                { name: 'About', id: 'about' },
                { name: 'Services', id: 'services' },
                { name: 'Portfolio', id: 'portfolio' },
                { name: 'Testimonials', id: 'testimonials' },
                { name: 'Contact', id: 'contact' }
              ].map((item, index) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="group relative text-left text-gray-700 hover:text-primaryNavy transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primaryNavy/5 hover:to-accentRed/5 font-sans"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primaryNavy/30 group-hover:bg-primaryNavy transition-colors duration-300"></div>
                    {item.name}
                  </span>
                  <div className="absolute left-0 top-0 w-0 h-full bg-gradient-to-r from-primaryNavy/10 to-accentRed/10 rounded-lg transition-all duration-300 group-hover:w-full"></div>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
