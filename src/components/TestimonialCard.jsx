import React from 'react'
import OptimizedImage from './OptimizedImage'

export default function TestimonialCard({quote, author, avatar, alt, rating = 5}){
  return (
    <blockquote className="group relative h-full flex flex-col bg-gradient-to-br from-white via-cream/30 to-white rounded-2xl p-5 sm:p-6 border border-gray-100/80 shadow-md hover:shadow-xl hover:border-gold/30 transition-all duration-300 overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold via-accentRed/80 to-primaryNavy opacity-80 group-hover:opacity-100 transition-opacity" />
      
      {/* Quote mark */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg className="w-16 h-16 text-primaryNavy" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.998 3.638-3.998 5.849h3.983v10h-9.981z" />
        </svg>
      </div>
      
      {/* Rating Stars */}
      <div className="flex gap-0.5 mb-4" role="img" aria-label={`${rating} out of 5 stars`}>
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-gold text-sm sm:text-base drop-shadow-sm" aria-hidden="true">★</span>
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-gray-700 mb-6 leading-relaxed flex-grow font-sans text-sm sm:text-base pl-2 relative z-10">"{quote}"</p>
      
      {/* Author with Avatar */}
      <footer className="flex items-center gap-4 mt-auto pl-2">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-white shadow-lg ring-offset-2 ring-offset-cream/50 flex-shrink-0">
          <OptimizedImage
            src={avatar}
            alt={alt || author}
            title={author}
            className="w-full h-full object-cover"
            type="AVATAR"
            placeholder={`https://ui-avatars.com/api/?name=${encodeURIComponent(author.split(',')[0].replace('— ', ''))}&background=EC1C24&color=fff&size=128&bold=true`}
          />
        </div>
        <div className="min-w-0">
          <cite className="block text-sm font-semibold text-primaryNavy not-italic truncate">
            {author.split(',')[0].replace('— ', '')}
          </cite>
          <span className="text-xs text-gray-500 font-sans">
            {author.split(',')[1]?.trim() || 'Client'}
          </span>
        </div>
      </footer>
    </blockquote>
  )
}
