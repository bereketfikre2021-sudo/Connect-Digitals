import React from 'react'
import { useFocusManagement, useKeyboardNavigation } from '../hooks/useFocusManagement'
import { useBackButtonClose } from '../hooks/useBackButtonClose'

export default function LegalModal({ isOpen, onClose, type, title, content }) {
  const closeModal = useBackButtonClose(isOpen, onClose)
  const modalRef = useFocusManagement(isOpen)
  useKeyboardNavigation(isOpen, closeModal)

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      aria-describedby="legal-modal-description"
    >
      <div ref={modalRef} className="bg-white rounded-xl sm:rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <div className="p-4 sm:p-6">
          {/* Minimal header */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 id="legal-modal-title" className="text-lg sm:text-xl font-display font-bold text-primaryNavy truncate">
              {title}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-accentRed transition-colors p-1.5 hover:bg-gray-100 rounded-lg shrink-0"
              aria-label="Close legal document"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div id="legal-modal-description" className="text-sm sm:text-base font-sans text-neutralDark space-y-4">
            <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}
