import React from 'react'

export default function Footer({ onOpenLegalModal }) {
  const socialLinks = [
    { href: 'https://linktr.ee/Connectdigitals', label: 'Linktree' },
    { href: 'https://wa.me/251923988838', label: 'WhatsApp' },
    { href: 'mailto:digitalsconnect@gmail.com', label: 'Email' }
  ]

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-6 sm:py-8" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Mobile: stacked, centered */}
        <div className="flex flex-col items-center text-center gap-4 sm:hidden">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primaryNavy/10 flex items-center justify-center p-1.5">
              <img 
                src="/Connect Icon.svg" 
                alt="Connect Digitals" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-display font-bold text-lg text-primaryNavy">Connect Digitals</h3>
            <p className="text-gray-500 text-xs font-sans">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-3" role="navigation" aria-label="Legal documents">
            <button onClick={() => onOpenLegalModal('privacy')} className="text-gray-500 hover:text-primaryNavy text-xs font-sans transition-colors" aria-label="Privacy Policy">Privacy</button>
            <button onClick={() => onOpenLegalModal('cookie')} className="text-gray-500 hover:text-primaryNavy text-xs font-sans transition-colors" aria-label="Cookie Policy">Cookie</button>
            <button onClick={() => onOpenLegalModal('terms')} className="text-gray-500 hover:text-primaryNavy text-xs font-sans transition-colors" aria-label="Terms of Service">Terms</button>
          </nav>
        </div>

        {/* Desktop: row layout */}
        <div className="hidden sm:flex flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primaryNavy/10 flex items-center justify-center p-1.5">
              <img 
                src="/Connect Icon.svg" 
                alt="Connect Digitals" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-primaryNavy">Connect Digitals</h3>
              <p className="text-gray-500 text-xs font-sans">© {new Date().getFullYear()}</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 sm:gap-8 shrink-0">
            <div className="flex gap-3 sm:gap-6">
              {socialLinks.map(({ href, label }) => (
                <a 
                  key={label}
                  href={href} 
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-gray-500 hover:text-primaryNavy text-xs sm:text-sm font-sans transition-colors whitespace-nowrap"
                  aria-label={label}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="w-px h-6 bg-gray-200 shrink-0" aria-hidden="true" />
            <nav className="flex gap-3 sm:gap-6" role="navigation" aria-label="Legal documents">
              <button onClick={() => onOpenLegalModal('privacy')} className="text-gray-500 hover:text-primaryNavy text-xs sm:text-sm font-sans transition-colors whitespace-nowrap" aria-label="Privacy Policy">Privacy</button>
              <button onClick={() => onOpenLegalModal('cookie')} className="text-gray-500 hover:text-primaryNavy text-xs sm:text-sm font-sans transition-colors whitespace-nowrap" aria-label="Cookie Policy">Cookie</button>
              <button onClick={() => onOpenLegalModal('terms')} className="text-gray-500 hover:text-primaryNavy text-xs sm:text-sm font-sans transition-colors whitespace-nowrap" aria-label="Terms of Service">Terms</button>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}