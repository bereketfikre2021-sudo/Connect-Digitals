import React, { useState, useEffect, useRef } from 'react'

export default function Header({ onOpenQuoteModal }){
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false)
  const moreRef = useRef(null)

  const navItems = [
    { id: 'about', name: 'About' },
    { id: 'services', name: 'Services' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'testimonials', name: 'Testimonials' },
    { id: 'contact', name: 'Contact' }
  ]
  
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
    const sections = ['hero', 'about', 'services', 'portfolio', 'case-studies', 'blog', 'faq', 'testimonials', 'contact']
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      setIsMoreOpen(false)
      const scrollY = window.scrollY
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop - 120 <= scrollY) {
          setCurrentSection(sections[i])
          break
        }
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMoreNav = (sectionId) => {
    scrollToSection(sectionId)
    setIsMoreOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setIsMoreOpen(false)
      }
    }
    if (isMoreOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMoreOpen])

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/25 backdrop-blur-2xl backdrop-saturate-150 rounded-b-3xl mx-4 border border-white/10' 
          : 'bg-gray-900/20 backdrop-blur-2xl backdrop-saturate-150 rounded-b-3xl mx-4 border border-white/10'
      }`}
      role="banner"
    >
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo Section */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-4 hover:opacity-80 transition-all duration-300 group"
            aria-label="Connect Digitals - Go to homepage"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/40 group-hover:ring-white/80 transition-all duration-300">
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
              <div className="font-display font-bold text-lg text-white group-hover:text-accentRed transition-colors duration-300">
                Connect Digitals
              </div>
              <div className="text-xs text-gray-200 font-medium tracking-wide font-sans">
                Connect. Create. Captivate.
              </div>
            </div>
          </button>

          {/* Navigation & CTA */}
          <div className="flex items-center gap-4 flex-1 justify-end min-w-0">
            {/* Desktop Navigation - centered pill bar */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-black/20 backdrop-blur-sm" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className={`relative px-5 py-2.5 rounded-xl font-medium font-sans transition-all duration-300 ${
                    currentSection === item.id
                      ? 'bg-primaryNavy text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </button>
              ))}
              <div className="relative" ref={moreRef}>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMoreOpen(!isMoreOpen) }}
                  className={`relative flex items-center gap-1 px-5 py-2.5 rounded-xl font-medium font-sans transition-all duration-300 ${
                    ['case-studies', 'blog', 'faq'].includes(currentSection)
                      ? 'bg-primaryNavy text-white'
                      : isMoreOpen
                        ? 'bg-white/10 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="More menu"
                  aria-expanded={isMoreOpen}
                  aria-haspopup="true"
                >
                  More
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMoreOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 py-2 w-48 bg-gray-900/90 backdrop-blur-2xl rounded-2xl border border-white/10 z-50"
                    role="menu"
                  >
                    <button 
                      onClick={() => handleMoreNav('case-studies')} 
                      className="w-full text-left px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors font-sans"
                      role="menuitem"
                    >
                      Case Studies
                    </button>
                    <button 
                      onClick={() => handleMoreNav('blog')} 
                      className="w-full text-left px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors font-sans"
                      role="menuitem"
                    >
                      Blog
                    </button>
                    <button 
                      onClick={() => handleMoreNav('faq')} 
                      className="w-full text-left px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors font-sans"
                      role="menuitem"
                    >
                      FAQ
                    </button>
                  </div>
                )}
              </div>
            </div>
            </nav>

            {/* Get Started CTA - Desktop */}
            <button
              onClick={onOpenQuoteModal}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accentRed hover:bg-accentRed/90 text-white font-semibold transition-all duration-300 shrink-0"
            >
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden relative p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Enhanced Design */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-navigation"
          className="lg:hidden border-t border-white/10 bg-gray-900/30 backdrop-blur-2xl rounded-b-2xl mx-4 mb-2 border border-white/10 transition-all duration-300"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="max-w-6xl mx-auto px-6 py-6">
            <nav className="flex flex-col gap-1">
              {[
                { name: 'About', id: 'about' },
                { name: 'Services', id: 'services' },
                { name: 'Portfolio', id: 'portfolio' },
                { name: 'Testimonials', id: 'testimonials' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className={`text-left font-medium py-3 px-4 rounded-xl font-sans transition-all duration-300 ${
                    currentSection === item.id
                      ? 'bg-primaryNavy text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2 mt-2 border-t border-white/10">
                <button
                  onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
                  className={`w-full text-left font-medium py-3 px-4 rounded-xl font-sans transition-all duration-300 flex items-center justify-between ${
                    ['case-studies', 'blog', 'faq'].includes(currentSection)
                      ? 'bg-primaryNavy text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  More
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isMobileMoreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileMoreOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    {[
                      { name: 'Case Studies', id: 'case-studies' },
                      { name: 'Blog', id: 'blog' },
                      { name: 'FAQ', id: 'faq' }
                    ].map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => scrollToSection(item.id)} 
                        className={`w-full text-left font-medium py-2 px-4 rounded-lg font-sans text-sm transition-all duration-300 ${
                          currentSection === item.id
                            ? 'bg-primaryNavy/50 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
