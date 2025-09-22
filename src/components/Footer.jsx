import React from 'react'

export default function Footer({ onOpenLegalModal }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-16 mt-20">
      {/* CACHE BUSTER - Quick Links Removed */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Content - Centered Layout */}
        <div className="text-center mb-12">
          {/* Brand Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primaryNavy/10 shadow-lg">
                <img 
                  src="/img/Connect.webp" 
                  alt="Connect Digitals" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-primaryNavy">Connect Digitals</h3>
                <p className="text-sm text-gray-600 font-sans">Connect. Create. Captivate.</p>
              </div>
            </div>
            <p className="text-gray-600 text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Transforming ideas into powerful visual experiences that connect, create, and captivate your audience.
            </p>
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-start sm:justify-center gap-3 p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-accentRed/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-accentRed" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-sans">Email</p>
                <p className="text-sm text-gray-700 font-sans">digitalsconnect@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center justify-start sm:justify-center gap-3 p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-sans">Phone</p>
                <p className="text-sm text-gray-700 font-sans">+251 923 988 838</p>
              </div>
            </div>

            <div className="flex items-center justify-start sm:justify-center gap-3 p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primaryNavy/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primaryNavy" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-sans">Location</p>
                <p className="text-sm text-gray-700 font-sans">Ethiopia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm font-sans">
              © {new Date().getFullYear()} Connect Digitals. All rights reserved.
            </p>
            
            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <button 
                onClick={() => onOpenLegalModal('privacy')}
                className="text-gray-500 hover:text-primaryNavy text-sm font-sans transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => onOpenLegalModal('cookie')}
                className="text-gray-500 hover:text-primaryNavy text-sm font-sans transition-colors duration-200"
              >
                Cookie Policy
              </button>
              <button 
                onClick={() => onOpenLegalModal('terms')}
                className="text-gray-500 hover:text-primaryNavy text-sm font-sans transition-colors duration-200"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}