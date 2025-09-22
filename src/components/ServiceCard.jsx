import React, { useState } from 'react'

export default function ServiceCard({icon, title, desc, details}){
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-center">{icon}</div>
      <h4 className="text-base sm:text-lg font-display font-semibold text-primaryNavy mb-2 sm:mb-3">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 font-sans flex-grow">{desc}</p>
      
      {isExpanded && (
        <div className="mb-4 p-4 bg-gray-50 rounded-xl">
          <p className="text-gray-700 text-sm leading-relaxed font-sans">{details}</p>
        </div>
      )}
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative w-full px-4 py-2 bg-primaryNavy text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden mt-auto"
      >
        <span className="relative z-10">{isExpanded ? 'Show Less' : 'Learn More'}</span>
        <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </button>
    </div>
  )
}
