import React from 'react'

export default function Footer({ onOpenLegalModal }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-6 sm:py-8" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primaryNavy/10 flex items-center justify-center p-1.5">
              <img 
                src="/Connect Icon.svg" 
                alt="Connect Digitals" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-display font-bold text-lg text-primaryNavy">Connect Digitals</h3>
          </div>
          <p className="text-gray-500 text-xs font-sans mb-4">© {new Date().getFullYear()} Connect Digitals</p>
          <nav className="flex gap-4 justify-center" role="navigation" aria-label="Legal documents">
            <button onClick={() => onOpenLegalModal('privacy')} className="text-gray-500 hover:text-primaryNavy text-xs font-sans" aria-label="Privacy Policy">Privacy</button>
            <button onClick={() => onOpenLegalModal('cookie')} className="text-gray-500 hover:text-primaryNavy text-xs font-sans" aria-label="Cookie Policy">Cookie</button>
            <button onClick={() => onOpenLegalModal('terms')} className="text-gray-500 hover:text-primaryNavy text-xs font-sans" aria-label="Terms of Service">Terms</button>
          </nav>
        </div>
      </div>
    </footer>
  )
}