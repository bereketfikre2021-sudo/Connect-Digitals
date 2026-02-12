import React, { useState, useEffect } from 'react'

const COOKIE_KEY = 'connect-digitals-cookie-consent'

export default function CookieBanner({ onOpenCookiePolicy }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) setIsVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setIsVisible(false)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h2 id="cookie-banner-title" className="font-display font-semibold text-primaryNavy text-sm sm:text-base mb-1">
            We use cookies
          </h2>
          <p id="cookie-banner-desc" className="text-gray-600 text-xs sm:text-sm font-sans">
            We use cookies to improve your experience and analyze site traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.{' '}
            <button 
              onClick={onOpenCookiePolicy}
              className="text-primaryNavy underline hover:no-underline font-medium"
            >
              Learn more
            </button>
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={decline}
            className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-4 py-2 bg-primaryNavy text-white rounded-xl text-sm font-medium hover:bg-primaryNavy/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
