import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useFocusManagement, useKeyboardNavigation } from '../hooks/useFocusManagement'
import { useBackButtonClose } from '../hooks/useBackButtonClose'

export default function QuoteModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const closeModal = useBackButtonClose(isOpen, onClose)
  const modalRef = useFocusManagement(isOpen)
  useKeyboardNavigation(isOpen, closeModal)

  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    const form = e.target
    const formData = new FormData(form)
    formData.set('_subject', 'Quote Request - Connect Digitals')
    try {
      const response = await fetch('https://formspree.io/f/mgvzpqpq', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      })
      const data = await response.json()
      if (data.ok) {
        setIsSubmitted(true)
        form.reset()
        setTimeout(() => {
          setIsSubmitted(false)
          closeModal()
        }, 2500)
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
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
              onClick={closeModal}
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
              onSubmit={handleSubmit}
              className="space-y-6"
              id="quote-modal-description"
            >
              {/* Honeypot for spam */}
              <div className="hidden" aria-hidden="true">
                <label>Don't fill this out: <input name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
              </div>
              {submitError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm" role="alert">
                  {submitError}
                </div>
              )}

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
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
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
                  <optgroup label="Brand Design">
                    <option value="logo-design">Logo Design</option>
                    <option value="visual-identity">Visual Identity</option>
                    <option value="brand-guidelines">Brand Guidelines</option>
                  </optgroup>
                  <optgroup label="Graphic Design">
                    <option value="marketing-advertising-graphics">Marketing & Advertising Graphics</option>
                    <option value="digital-media-design">Digital Media Design</option>
                    <option value="layout-print-design">Layout & Print Design</option>
                  </optgroup>
                  <optgroup label="Web & UI Design">
                    <option value="website-design-development">Website Design & Development</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="wireframes-prototypes">Wireframes & Prototypes</option>
                  </optgroup>
                  <optgroup label="Social Media Design">
                    <option value="social-media-creatives">Social Media Creatives</option>
                    <option value="ad-design">Ad Design</option>
                    <option value="campaign-visuals">Campaign Visuals</option>
                  </optgroup>
                  <optgroup label="Packaging and Environmental Design">
                    <option value="packaging-design">Packaging Design</option>
                    <option value="label-design">Label Design</option>
                    <option value="signage">Signage</option>
                  </optgroup>
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
                  minLength={20}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryNavy focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  title="Please provide at least 20 characters"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="Cancel quote request and close modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex-1 px-6 py-3 bg-primaryNavy text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  aria-label={isSubmitting ? 'Submitting quote request' : 'Submit quote request'}
                >
                  <span className="relative z-10">{isSubmitting ? 'Submitting...' : 'Request Quote'}</span>
                  <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </form>
          ) : (
            /* Success Message */
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <motion.svg 
                  className="w-8 h-8 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </motion.svg>
              </motion.div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">Quote Request Sent!</h3>
              <p className="text-gray-600">
                Thank you for your interest! We'll review your project details and get back to you within 24 hours with a personalized quote.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
