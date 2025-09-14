import React from 'react'
import OptimizedImage from './OptimizedImage'

export default function TestimonialCard({quote, author, avatar, alt, rating = 5}){
  return (
    <blockquote className="bg-white rounded-2xl p-4 sm:p-6 shadow hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Rating Stars */}
      <div className="flex mb-3 sm:mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-base sm:text-lg">★</span>
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed flex-grow font-sans text-sm sm:text-base">"{quote}"</p>
      
      {/* Author with Avatar */}
      <div className="flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md">
                <OptimizedImage
                  src={avatar}
                  alt={alt || author}
                  title={author}
                  className="w-full h-full"
                  placeholder={`https://ui-avatars.com/api/?name=${encodeURIComponent(author.split(',')[0].replace('— ', ''))}&background=EC1C24&color=fff&size=128&bold=true`}
                />
              </div>
        <div>
          <cite className="block text-sm font-semibold text-gray-800 not-italic">
            {author.split(',')[0].replace('— ', '')}
          </cite>
          <span className="text-xs text-gray-500 font-sans">
            {author.split(',')[1]?.trim() || 'Client'}
          </span>
        </div>
      </div>
    </blockquote>
  )
}
