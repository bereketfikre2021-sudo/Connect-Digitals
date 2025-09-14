import React, { useState } from 'react'

export default function PricingModal({ isOpen, onClose }) {
  const [selectedPackage, setSelectedPackage] = useState(null)

  const packages = [
    {
      id: 'starter',
      name: 'Beginner',
      description: 'Perfect for small businesses and startups',
      price: '5k - 10k',
      color: 'from-blue-500 to-blue-600',
      features: [
        'Logo Design (3 concepts)',
        'Business Card Design',
        'Basic Brand Guidelines',
        '2 Revisions',
        'Source Files (PNG, JPG)',
        'Timeline: 5-7 days'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing businesses',
      price: '10k - 15k',
      color: 'from-primaryNavy to-accentRed',
      features: [
        'Complete Brand Identity',
        'Logo + Variations',
        'Business Stationery Suite',
        'Social Media Templates (5)',
        'Brand Guidelines Document',
        '5 Revisions',
        'Source Files (AI, PSD, PNG)',
        'Timeline: 10-14 days'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Comprehensive solution for established brands',
      price: '15k - 20k',
      color: 'from-purple-500 to-pink-500',
      features: [
        'Full Brand Identity System',
        'Logo + Extensive Variations',
        'Complete Stationery Suite',
        'Social Media Kit (15+ templates)',
        'Website Design Consultation',
        'Marketing Materials',
        'Unlimited Revisions',
        'All Source Files',
        'Brand Strategy Session',
        'Timeline: 15-21 days'
      ],
      popular: false
    }
  ]

  const serviceTimelines = [
    { service: 'Logo Design', timeline: '3-5 days' },
    { service: 'Brand Identity', timeline: '7-10 days' },
    { service: 'Business Cards', timeline: '2-3 days' },
    { service: 'Social Media Templates', timeline: '3-5 days' },
    { service: 'Website Design', timeline: '10-14 days' },
    { service: 'Marketing Materials', timeline: '5-7 days' }
  ]

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
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-primaryNavy">Our Pricing</h2>
              <p className="text-gray-600 mt-2 font-sans text-sm sm:text-base">Choose the perfect package for your project needs</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  pkg.popular ? 'border-primaryNavy ring-2 ring-primaryNavy ring-opacity-20' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primaryNavy text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4 font-sans">{pkg.description}</p>
                  <div className={`inline-block ${pkg.color === 'from-primaryNavy to-accentRed' ? 'bg-primaryNavy' : pkg.color} text-white px-6 py-3 rounded-xl font-bold text-xl shadow-lg`}>
                    {pkg.price}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="tel:+251923988838"
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 text-center block transform hover:-translate-y-1 hover:shadow-lg ${
                    pkg.popular
                      ? 'group relative bg-primaryNavy text-white overflow-hidden'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300'
                  }`}
                >
                  {pkg.popular ? (
                    <>
                      <span className="relative z-10">Choose {pkg.name}</span>
                      <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </>
                  ) : (
                    `Choose ${pkg.name}`
                  )}
                </a>
              </div>
            ))}
          </div>

          {/* Timeline Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-display font-bold text-primaryNavy mb-6 text-center">Project Timelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceTimelines.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.service}</h4>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-accentRed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600 font-medium font-sans">{item.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-primaryNavy rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-display font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg mb-6 opacity-90">
              Contact us for a personalized quote and let's bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+251923988838"
                className="px-8 py-3 bg-white text-primaryNavy rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Call Now
              </a>
              <a
                href="mailto:digitalsconnect@gmail.com"
                className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primaryNavy transition-colors"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
