import React, { useState } from 'react'
import OptimizedImage from './OptimizedImage'

export default function PortfolioCard({img, title, alt, children, caseStudy}){
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <>
      <div className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <OptimizedImage 
          src={img} 
          alt={alt || title} 
          title={title}
          className="w-full h-40 sm:h-48" 
        />
      <div className="p-4 flex flex-col flex-grow">
        <div className="font-semibold text-base sm:text-lg">{title}</div>
        <div className="text-sm text-gray-600 mt-2 font-sans flex-grow">{children}</div>
        <div className="mt-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-medium text-primaryNavy hover:text-accentRed transition-colors duration-300"
            >
              View More →
            </button>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-display font-bold text-primaryNavy">{title}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <OptimizedImage 
                src={img} 
                alt={alt || title} 
                title={title}
                className="w-full h-64 rounded-xl" 
              />
            </div>

            {caseStudy && (
              <div className="space-y-6">
                {/* Challenge */}
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Challenge
                  </h4>
                  <p className="text-red-700">{caseStudy.challenge}</p>
                </div>

                {/* Solution */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    What We Did
                  </h4>
                  <p className="text-blue-700">{caseStudy.solution}</p>
                </div>

                {/* Results */}
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Results
                  </h4>
                  <div className="text-green-700">
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="mb-2">
                        <span className="font-semibold text-green-800">{result.metric}:</span> {result.value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="group relative flex-1 px-6 py-3 bg-primaryNavy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10">Close</span>
                <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <a
                href="https://heyzine.com/flip-book/2e51bd7d15.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 border-2 border-primaryNavy text-primaryNavy rounded-xl font-semibold hover:bg-primaryNavy hover:text-white transition-all duration-300 text-center"
              >
                View Full Portfolio
              </a>
        </div>
      </div>
    </div>
      )}
    </>
  )
}
