import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Header({ onOpenQuoteModal }){
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navItems = [
    { id: 'about', name: 'About' },
    { id: 'services', name: 'Services' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'contact', name: 'Contact', isRoute: true }
  ]
  
  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false)
    if (item.isRoute) {
      navigate('/contact')
      return
    }
    if (isHome) {
      const element = document.getElementById(item.id)
      if (element) element.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate({ pathname: '/', hash: item.id })
    }
  }

  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault()
      const el = document.getElementById('hero')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    if (!isHome) setCurrentSection(location.pathname === '/contact' ? 'contact' : 'hero')
  }, [isHome, location.pathname])

  useEffect(() => {
    if (!isHome) return
    const sections = ['hero', 'about', 'services', 'portfolio', 'contact']
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
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
  }, [isHome])

  return (
    <header 
      className={`fixed inset-x-2 sm:inset-x-4 md:inset-x-6 top-0 z-50 transition-all duration-300 overflow-x-hidden ${
        isScrolled 
          ? 'bg-gray-900/25 backdrop-blur-2xl backdrop-saturate-150 rounded-b-3xl border border-white/10' 
          : 'bg-gray-900/20 backdrop-blur-2xl backdrop-saturate-150 rounded-b-3xl border border-white/10'
      }`}
      role="banner"
    >
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4 md:gap-6 min-w-0">
          {/* Logo Section */}
          <Link 
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 sm:gap-4 hover:opacity-80 transition-all duration-300 group min-w-0 shrink-0"
            aria-label="Connect Digitals - Go to homepage"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/40 group-hover:ring-white/80 transition-all duration-300 flex items-center justify-center p-1.5">
                <img 
                  src="/Connect Icon.svg" 
                  alt="Connect Digitals - Professional Graphic Design and Branding Agency Logo" 
                  className="w-full h-full object-contain"
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
          </Link>

          {/* Navigation & CTA */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end min-w-0 shrink-0">
            {/* Desktop Navigation - centered pill bar */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-black/20 backdrop-blur-sm" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item)} 
                  className={`relative px-5 py-2.5 rounded-xl font-medium font-sans transition-all duration-300 ${
                    currentSection === item.id
                      ? 'bg-primaryNavy text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label={`Navigate to ${item.name}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            </nav>

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
          className="lg:hidden border-t border-white/10 bg-gray-900/30 backdrop-blur-2xl rounded-b-2xl mb-2 border border-white/10 transition-all duration-300"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6 py-6">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item)} 
                  className={`w-full text-left font-medium py-3 px-4 rounded-xl font-sans transition-all duration-300 ${
                    currentSection === item.id
                      ? 'bg-primaryNavy text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
