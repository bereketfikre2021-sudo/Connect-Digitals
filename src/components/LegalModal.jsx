import React, { useEffect } from 'react'

export default function LegalModal({ isOpen, onClose, type, title, content }) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primaryNavy rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {type === 'privacy' ? '🔒' : type === 'cookie' ? '🍪' : '📋'}
                </span>
              </div>
              <h2 className="text-3xl font-display font-bold text-primaryNavy">
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-accentRed transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-cream border-l-4 border-gold p-4 rounded-r-lg mb-8">
              <p className="text-neutralDark font-sans">
                <strong className="text-primaryNavy">Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}
