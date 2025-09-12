import React, { useState } from 'react'

export default function ServiceCard({icon, title, desc, details}){
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-lg font-display font-semibold text-primaryNavy mb-3">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
      
      {isExpanded && (
        <div className="mb-4 p-4 bg-gray-50 rounded-xl">
          <p className="text-gray-700 text-sm leading-relaxed">{details}</p>
        </div>
      )}
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 bg-gradient-to-r from-primaryNavy to-accentRed text-white rounded-lg font-medium text-sm hover:from-accentRed hover:to-primaryNavy transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
      >
        {isExpanded ? 'Show Less' : 'Learn More'}
      </button>
    </div>
  )
}
