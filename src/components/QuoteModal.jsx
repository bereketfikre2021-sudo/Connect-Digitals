import React, { useState } from 'react'
import { useFocusManagement, useKeyboardNavigation } from '../hooks/useFocusManagement'

export default function QuoteModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Focus management
  const modalRef = useFocusManagement(isOpen)
  useKeyboardNavigation(isOpen, onClose)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        onClose()
      }, 2000)
    }, 1000)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      aria-describedby="quote-modal-description"
    >
      <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 id="quote-modal-title" className="text-2xl font-display font-bold text-primaryNavy">Request a Quote</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close quote request form"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!isSubmitted ? (
            <form 
              name="quote-request" 
              method="POST" 
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
              id="quote-modal-description"
            >
              {/* Hidden field for Netlify */}
              <input type="hidden" name="form-name" value="quote-request" />
              <div className="hidden">
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryNavy focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryNavy focus:border-transparent transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Service Needed */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Needed *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryNavy focus:border-transparent transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="logo-branding">Logo & Branding</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="social-media">Social Media Management</option>
                  <option value="web-design">Web Design</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="multiple-services">Multiple Services</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range *
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryNavy focus:border-transparent transition-colors"
                >
                  <option value="">Select your budget range</option>
                  <option value="under-1k">Under 1k</option>
                  <option value="1k-2.5k">1k - 2.5k</option>
                  <option value="2.5k-5k">2.5k - 5k</option>
                  <option value="5k-10k">5k - 10k</option>
                  <option value="10k-25k">10k - 25k</option>
                  <option value="over-25k">Over 25k</option>
                  <option value="discuss">Let's discuss</option>
                </select>
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryNavy focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="Cancel quote request and close modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-primaryNavy text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={isSubmitting ? 'Submitting quote request' : 'Submit quote request'}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Quote'}
                </button>
              </div>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">Quote Request Sent!</h3>
              <p className="text-gray-600">
                Thank you for your interest! We'll review your project details and get back to you within 24 hours with a personalized quote.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
