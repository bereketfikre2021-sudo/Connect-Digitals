import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'
import PortfolioCard from '../components/PortfolioCard'
import TestimonialCard from '../components/TestimonialCard'
import OptimizedImage from '../components/OptimizedImage'

// Custom hook for counting animation
function useCountUp(end, start = 0, duration = 2000, trigger = true) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible || !trigger) return

    let startTime
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(start + (end - start) * easeOutQuart)
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isVisible, end, start, duration, trigger])

  return [count, ref]
}

const serviceCategories = [
  {
    id: 'creative',
    title: '🎨 Creative Design Services',
    services: [
      { 
        id: 1, 
        title: 'Graphic Design & Layout', 
        desc: 'Professional design solutions for all your visual needs.',
        details: 'From business cards to brochures, we create stunning graphic designs and layouts that communicate your message effectively. Our designs are both visually appealing and strategically crafted to achieve your business goals.',
        icon: '📐' 
      },
      { 
        id: 2, 
        title: 'Branding & Visual Identity Design', 
        desc: 'Build a strong brand that stands out from the competition.',
        details: 'Complete branding solutions including logo design, color palettes, typography, and brand guidelines. We create cohesive visual identities that resonate with your target audience and differentiate you from competitors.',
        icon: '🏷️' 
      },
      { 
        id: 3, 
        title: 'Packaging & Labeling Design', 
        desc: 'Make your products irresistible with eye-catching packaging.',
        details: 'Professional packaging and labeling design that attracts customers and protects your products. We create designs that not only look great but also comply with industry standards and regulations.',
        icon: '📦' 
      },
      { 
        id: 4, 
        title: 'Digital Media Design', 
        desc: 'Design-only solutions for your digital presence.',
        details: 'Digital media design services including web graphics, social media assets, and digital marketing materials. We provide design files ready for implementation across all digital platforms (design only, no printing services).',
        icon: '💻' 
      }
    ]
  },
  {
    id: 'digital',
    title: '💻 Digital & Web Design Services',
    services: [
      { 
        id: 5, 
        title: 'Web Design & Development', 
        desc: 'Build websites that work beautifully on all devices.',
        details: 'Custom web design and development services that combine stunning visuals with seamless functionality. We create responsive websites that provide excellent user experience across desktop, tablet, and mobile devices.',
        icon: '🌐' 
      },
      { 
        id: 6, 
        title: 'UI/UX Design & Prototyping', 
        desc: 'Create intuitive user experiences that delight your customers.',
        details: 'User interface and user experience design services including wireframing, prototyping, and usability testing. We ensure your digital products are not only beautiful but also easy to use and navigate.',
        icon: '🎯' 
      }
    ]
  },
  {
    id: 'marketing',
    title: '📢 Marketing Design Services',
    services: [
      { 
        id: 7, 
        title: 'Advertising & Marketing Design', 
        desc: 'Create campaigns that capture attention and drive results.',
        details: 'Professional advertising and marketing design for print, digital, and outdoor media. We create compelling visuals that communicate your message effectively and drive customer engagement and sales.',
        icon: '📈' 
      },
      { 
        id: 8, 
        title: 'Social Media Marketing Design & Advertising Assets', 
        desc: 'Engage your audience with stunning social media content.',
        details: 'Social media marketing design and advertising assets including posts, stories, ads, and campaign materials. We create content that resonates with your audience and drives engagement across all social platforms.',
        icon: '📱' 
      }
    ]
  }
]

const portfolio = [
  { 
    id:1, 
    title:'Zewd - Minimalist Brand Identity', 
    img:'/img/Zewd.webp',
    alt:'Zewd minimalist brand identity design by Connect Digitals - clean logo, modern typography, and professional branding for Ethiopian tech company',
    caseStudy: {
      challenge: "Zewd needed a modern, minimalist brand identity that would stand out in the competitive tech market while maintaining simplicity and professionalism.",
      solution: "Created a clean, geometric logo design with a sophisticated color palette and comprehensive brand guidelines including typography, spacing, and application examples.",
      results: [
        { metric: "Brand Recognition", value: "85% increase in brand recall" },
        { metric: "Client Satisfaction", value: "98% approval rating" },
        { metric: "Market Position", value: "Established premium brand perception" }
      ]
    }
  },
  { 
    id:2, 
    title:'Swan Clothing - Complete Brand Identity', 
    img:'/img/swan-clothing.webp',
    alt:'Swan Clothing complete brand identity design by Connect Digitals - fashion logo, brand colors, and comprehensive fashion branding for Ethiopian clothing brand',
    caseStudy: {
      challenge: "Swan Clothing needed a complete brand overhaul to compete with established fashion brands and attract younger demographics.",
      solution: "Developed a comprehensive brand identity including logo, color scheme, typography, packaging design, and social media templates with a focus on elegance and modernity.",
      results: [
        { metric: "Social Media Growth", value: "300% increase in followers" },
        { metric: "Sales Growth", value: "150% increase in online sales" },
        { metric: "Brand Engagement", value: "200% increase in social media engagement" }
      ]
    }
  },
  { 
    id:3, 
    title:'Finix - Digital Marketing Assets', 
    img:'/img/Finix.webp',
    alt:'Finix digital marketing assets by Connect Digitals - social media graphics, promotional materials, and financial services branding for Ethiopian fintech company',
    caseStudy: {
      challenge: "Finix required compelling digital marketing materials to launch their new financial services platform and build trust with potential customers.",
      solution: "Created a series of professional marketing assets including social media graphics, banner ads, email templates, and presentation materials with consistent branding.",
      results: [
        { metric: "Lead Generation", value: "250% increase in qualified leads" },
        { metric: "Conversion Rate", value: "40% improvement in sign-up rate" },
        { metric: "Brand Trust", value: "90% increase in brand credibility scores" }
      ]
    }
  },
  { 
    id:4, 
    title:'Lensa Fashion - Packaging Design', 
    img:'/img/Lensa Fashion Design & Makeup.webp',
    alt:'Lensa Fashion packaging design by Connect Digitals - elegant typography, premium brand elements, and luxury fashion packaging for Ethiopian beauty brand',
    caseStudy: {
      challenge: "Lensa Fashion needed eye-catching packaging design that would make their products stand out on retail shelves and reflect their premium brand positioning.",
      solution: "Designed premium packaging with elegant typography, sophisticated color schemes, and unique structural elements that enhanced the unboxing experience.",
      results: [
        { metric: "Retail Performance", value: "180% increase in shelf appeal" },
        { metric: "Customer Satisfaction", value: "95% positive packaging feedback" },
        { metric: "Brand Premium", value: "25% increase in perceived value" }
      ]
    }
  },
  { 
    id:5, 
    title:'Professional Company Profile', 
    img:'/img/Company profile.webp',
    alt:'Professional company profile design by Connect Digitals - modern layout, corporate branding, and business presentation materials for Ethiopian companies',
    caseStudy: {
      challenge: "A corporate client needed a professional company profile that would effectively communicate their expertise and attract high-value business partnerships.",
      solution: "Created a comprehensive company profile with modern design, compelling copy, infographics, and professional photography that showcased their capabilities and achievements.",
      results: [
        { metric: "Partnership Inquiries", value: "300% increase in business inquiries" },
        { metric: "Presentation Success", value: "100% success rate in client presentations" },
        { metric: "Brand Authority", value: "Established industry leadership position" }
      ]
    }
  },
  { 
    id:6, 
    title:'Maleda Coffee - Product Advertisement', 
    img:'/img/Maleda Coffee.webp',
    alt:'Maleda Coffee product advertisement design by Connect Digitals - premium coffee branding, lifestyle imagery, and Ethiopian coffee marketing materials',
    caseStudy: {
      challenge: "Maleda Coffee needed compelling advertising materials to promote their premium coffee products and compete with established coffee brands in the market.",
      solution: "Developed a series of high-impact advertisements featuring lifestyle photography, compelling copy, and strategic placement across digital and print media.",
      results: [
        { metric: "Brand Awareness", value: "220% increase in brand recognition" },
        { metric: "Sales Growth", value: "160% increase in product sales" },
        { metric: "Market Share", value: "35% increase in local market presence" }
      ]
    }
  }
]

const testimonials = [
  { 
    id:1, 
    quote:'Bereket transformed our small non-profit\'s fundraising campaign with his creative vision. The emotional storytelling in our donation posters increased contributions by 180% in just 3 months. His understanding of our mission made all the difference.', 
    author:'— Gedyon Megersa, Non-Profit Director',
    avatar:'/img/Gedy.webp',
    alt:'Gedyon Megersa, Non-Profit Director - satisfied client testimonial for Connect Digitals graphic design services in Ethiopia'
  },
  { 
    id:2, 
    quote:'Our tech startup needed a complete brand identity that would stand out in the competitive market. Connect Digitals delivered a modern logo, website design, and marketing materials that perfectly captured our innovative spirit. Investors loved our presentation!', 
    author:'— Dagmawi Yeshiwas, Creative Director',
    avatar:'/img/Dag.webp',
    alt:'Dagmawi Yeshiwas, Creative Director - happy client testimonial for Connect Digitals branding and web design services in Addis Ababa'
  },
  { 
    id:3, 
    quote:'I needed a professional portfolio website that would showcase my digital marketing skills. Bereket created a stunning, responsive design that landed me 3 new clients within the first month. The attention to detail was incredible.', 
    author:'— Abenezer A, Digital Marketer',
    avatar:'/img/Abenezer.webp',
    alt:'Abenezer A, Digital Marketer - successful client testimonial for Connect Digitals portfolio website design services in Ethiopia'
  },
  { 
    id:4, 
    quote:'Running a local restaurant, I needed eye-catching menus and social media content. Connect Digitals created beautiful designs that made our food look irresistible. Our Instagram followers grew by 300% and reservations doubled!', 
    author:'— Kassaye Getachew, Business Owner',
    avatar:'/img/Kass.webp',
    alt:'Kassaye Getachew, Business Owner - delighted client testimonial for Connect Digitals restaurant menu and social media design services in Ethiopia'
  },
  { 
    id:5, 
    quote:'As a freelance artist, I needed a cohesive brand that would attract high-end clients. Bereket designed a sophisticated logo and business cards that perfectly represented my artistic style. The quality exceeded my expectations.', 
    author:'— Micky, Digital Artist',
    avatar:'/img/Miko.webp',
    alt:'Micky, Digital Artist - pleased client testimonial for Connect Digitals logo design and business card services in Addis Ababa'
  },
  { 
    id:6, 
    quote:'I was launching my web development agency and needed a professional brand identity. Connect Digitals created a clean, modern logo and website that immediately established credibility. The design process was collaborative and the results were perfect.', 
    author:'— Hayleyesus, Web Developer',
    avatar:'/img/Hayle.webp',
    alt:'Hayleyesus, Web Developer - satisfied client testimonial for Connect Digitals brand identity and website design services in Ethiopia'
  },
]

export default function Home({ onOpenQuoteModal, onOpenPricingModal }){
  // Counting animations for stats
  const [projectsCount, projectsRef] = useCountUp(150, 0, 2000)
  const [satisfactionCount, satisfactionRef] = useCountUp(98, 0, 2000)
  const [experienceCount, experienceRef] = useCountUp(5, 0, 2000)
  
  // Contact form state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  // Hero slideshow state
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroImages = [
    { src: '/img/BG.webp', alt: 'Connect Digitals creative workspace showcasing professional graphic design and branding services in Addis Ababa, Ethiopia' },
    { src: '/img/BG-2.webp', alt: 'Modern design studio with professional graphic design tools, logo design equipment, and branding materials in Ethiopia' },
    { src: '/img/BG-3.webp', alt: 'Creative workspace featuring digital design tools, web design software, and marketing materials for Ethiopian businesses' },
    { src: '/img/BG-4.webp', alt: 'Innovative design process and creative collaboration space for graphic design, branding, and digital marketing projects' },
    { src: '/img/BG-5.webp', alt: 'Premium design studio with professional equipment, creative tools, and branding resources for Ethiopian companies' }
  ]
  
  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000) // Change slide every 4 seconds
    
    return () => clearInterval(interval)
  }, [heroImages.length])
  
  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.target)
    
    try {
      const response = await fetch('https://formspree.io/f/mgvzpqpq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setShowSuccessModal(true)
        e.target.reset()
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('There was an error submitting your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <main id="main-content" className="max-w-6xl mx-auto px-6 pt-24 pb-12">
      <section id="hero" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 lg:py-12" aria-label="Hero section">
        <div>
          <motion.h1 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-primaryNavy leading-tight">Connect. Create. Captivate.</motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} className="mt-4 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
            We connect your vision, create powerful brands, and captivate your audience with thoughtful design and strategy.
          </motion.p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button 
              onClick={onOpenQuoteModal}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primaryNavy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden text-center sm:text-left"
              aria-label="Open quote request form"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            <a 
              href="#portfolio" 
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-primaryNavy text-primaryNavy rounded-xl font-semibold hover:bg-primaryNavy hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center sm:text-left"
              aria-label="Navigate to portfolio section"
            >
              View Portfolio
            </a>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6" role="region" aria-label="Company statistics">
            <div className="text-center group" ref={projectsRef}>
              <div className="bg-gradient-to-br from-primaryNavy to-primaryNavy rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" style={{ background: 'linear-gradient(135deg, #000F33, #1a2a5c)' }}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300" aria-label={`${projectsCount} projects completed`}>{projectsCount}+</div>
                <div className="text-gray-200 font-medium text-xs sm:text-sm lg:text-base">Projects Completed</div>
                <div className="w-8 sm:w-10 lg:w-12 h-1 bg-white rounded-full mx-auto mt-2 sm:mt-3 opacity-60"></div>
              </div>
            </div>
            
            <div className="text-center group" ref={satisfactionRef}>
              <div className="bg-gradient-to-br from-accentRed to-accentRed rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" style={{ background: 'linear-gradient(135deg, #EC1C24, #c41e3a)' }}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300" aria-label={`${satisfactionCount} percent client satisfaction`}>{satisfactionCount}%</div>
                <div className="text-red-100 font-medium text-xs sm:text-sm lg:text-base">Client Satisfaction</div>
                <div className="w-8 sm:w-10 lg:w-12 h-1 bg-white rounded-full mx-auto mt-2 sm:mt-3 opacity-60"></div>
              </div>
            </div>
            
            <div className="text-center group" ref={experienceRef}>
              <div className="bg-gradient-to-br from-gold to-gold rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" style={{ background: 'linear-gradient(135deg, #D4AF37, #b8941f)' }}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300" aria-label={`${experienceCount} years of experience`}>{experienceCount}+</div>
                <div className="text-yellow-100 font-medium text-xs sm:text-sm lg:text-base">Years Experience</div>
                <div className="w-8 sm:w-10 lg:w-12 h-1 bg-white rounded-full mx-auto mt-2 sm:mt-3 opacity-60"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-first lg:order-last">
          <motion.div 
            initial={{ scale:0.98, opacity:0 }} 
            animate={{ scale:1, opacity:1 }} 
            transition={{ duration:0.6 }} 
            className="rounded-2xl overflow-hidden shadow-2xl relative group"
          >
            {/* Slideshow Container */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden" role="img" aria-label="Connect Digitals workspace showcase">
              {heroImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ 
                    opacity: index === currentSlide ? 1 : 0,
                    scale: index === currentSlide ? 1 : 1.1
                  }}
                  transition={{ 
                    duration: 1.2,
                    ease: "easeInOut"
                  }}
                  aria-hidden={index !== currentSlide}
                >
                  {index === 0 ? (
                    // First image - no lazy loading, immediate discovery
                    <img
                      src={image.src}
                      alt={image.alt}
                      title={`Connect Digitals - ${image.alt}`}
                      className="w-full h-full transition-transform duration-[8000ms] ease-linear group-hover:scale-105"
                      loading="eager"
                      fetchpriority="high"
                      decoding="sync"
                    />
                  ) : (
                    // Other images - lazy loading
                    <OptimizedImage 
                      src={image.src} 
                      alt={image.alt} 
                      title={`Connect Digitals - ${image.alt}`}
                      className="w-full h-full transition-transform duration-[8000ms] ease-linear group-hover:scale-105"
                      type="HERO"
                      priority={false}
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  
                  {/* Slide Number Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1" aria-label={`Slide ${index + 1} of ${heroImages.length}`}>
                    <span className="text-white text-sm font-medium">
                      {index + 1} / {heroImages.length}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
                <motion.div 
                  className="h-full bg-primaryNavy"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity
                  }}
                />
              </div>
              
              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3" role="tablist" aria-label="Image carousel controls">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="group/indicator relative"
                    role="tab"
                    aria-selected={index === currentSlide}
                    aria-label={`Go to slide ${index + 1}`}
                    tabIndex={index === currentSlide ? 0 : -1}
                  >
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index === currentSlide 
                        ? 'bg-white shadow-lg scale-125' 
                        : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                    }`} />
                    
                    {/* Ripple Effect */}
                    {index === currentSlide && (
                      <motion.div
                        className="absolute inset-0 w-3 h-3 rounded-full border-2 border-white"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentSlide((prev) => prev === 0 ? heroImages.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Floating Elements */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-2000"></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-10">
        <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primaryNavy rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-display font-bold text-primaryNavy">Who we are</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 max-w-xl leading-relaxed font-sans">
                  At <span className="font-semibold text-primaryNavy">Connect Digitals</span>, we believe every successful brand starts with a meaningful connection. We connect with your vision, create compelling designs, and help you captivate your audience — turning ideas into stories people remember.
                </p>
                
                <div className="bg-gradient-to-r from-gold/10 to-accentRed/10 border-l-4 border-gold p-4 rounded-r-lg">
                  <p className="text-gray-700 text-sm font-sans">
                    Founded by <span className="font-bold text-primaryNavy">Bereket Fikre</span>, a brand builder and creative designer with <span className="font-semibold text-accentRed">5+ years of experience</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="bg-primaryNavy rounded-2xl p-6 text-white text-center shadow-xl">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Ready to Connect?</h3>
                <p className="text-white/90 text-sm mb-4">Let's create something amazing together</p>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group w-full px-6 py-4 bg-white text-primaryNavy rounded-xl font-semibold border-2 border-white hover:border-primaryNavy transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  aria-label="Navigate to contact section to work with us"
                >
                  <span className="group-hover:text-primaryNavy transition-colors duration-300">Work with us</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accentRed rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-primaryNavy">Our Mission</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-neutralDark leading-relaxed font-sans">
                To empower businesses and individuals with <span className="font-semibold text-accentRed">exceptional design solutions</span> that not only meet their immediate needs but also build lasting connections with their audiences.
              </p>
              
              <div className="bg-cream border-l-4 border-accentRed p-4 rounded-r-lg">
                <p className="text-neutralDark text-sm font-sans">
                  <strong className="text-primaryNavy">We strive to:</strong> Transform complex ideas into simple, powerful visual stories that resonate, inspire, and drive meaningful engagement across all touchpoints.
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-primaryNavy">Our Vision</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-neutralDark leading-relaxed font-sans">
                To become the <span className="font-semibold text-gold">leading creative partner</span> in Ethiopia and beyond, recognized for our innovative approach to design and our commitment to helping brands tell their unique stories.
              </p>
              
              <div className="bg-cream border-l-4 border-gold p-4 rounded-r-lg">
                <p className="text-neutralDark text-sm font-sans">
                  <strong className="text-primaryNavy">We envision:</strong> A world where every business, regardless of size, has access to world-class design that elevates their brand and creates genuine connections with their community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primaryNavy rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-display font-bold text-primaryNavy">Our Core Values</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accentRed/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accentRed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-display font-semibold text-primaryNavy mb-2">Quality First</h4>
              <p className="text-neutralDark text-sm font-sans">We never compromise on quality. Every project receives our full attention and expertise.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-display font-semibold text-primaryNavy mb-2">Client Partnership</h4>
              <p className="text-neutralDark text-sm font-sans">We work as an extension of your team, understanding your goals and challenges.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primaryNavy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primaryNavy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-display font-semibold text-primaryNavy mb-2">Innovation</h4>
              <p className="text-neutralDark text-sm font-sans">We stay ahead of trends and continuously evolve our creative approach.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold text-primaryNavy">Our Services</h3>
          <button
            onClick={onOpenPricingModal}
            className="group relative px-8 py-4 bg-accentRed text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            aria-label="View our pricing packages and service costs"
          >
            <span className="relative z-10">View Pricing</span>
            <div className="absolute inset-0 bg-primaryNavy transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
        <div className="space-y-20">
          {serviceCategories.map((category, index) => (
            <div key={category.id} className="relative">
              {/* Modern Category Styling */}
              <div className="relative mb-12">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primaryNavy rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">{category.title.split(' ')[0]}</span>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <h4 className="text-4xl font-display font-bold text-primaryNavy tracking-tight">
                      {category.title.replace(/^[^\s]+\s/, '')}
                    </h4>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="flex justify-center space-x-2 mb-8">
                  <div className="w-2 h-2 bg-accentRed rounded-full"></div>
                  <div className="w-8 h-px bg-accentRed"></div>
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <div className="w-8 h-px bg-gold"></div>
                  <div className="w-2 h-2 bg-primaryNavy rounded-full"></div>
                </div>
              </div>
              
              {/* Services Grid with Enhanced Styling */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {category.services.map((service, serviceIndex) => (
                    <div key={service.id} className="transform hover:scale-105 transition-all duration-300">
                      <ServiceCard {...service} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="py-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold text-primaryNavy">Featured Work</h3>
          <a 
            href="https://heyzine.com/flip-book/2e51bd7d15.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-primaryNavy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Explore Full Portfolio</span>
            <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {portfolio.map(p => (
            <PortfolioCard 
              key={p.id} 
              img={p.img}
              title={p.title}
              alt={p.alt}
              caseStudy={p.caseStudy}
            >
              Brief description goes here. Click to view more.
            </PortfolioCard>
          ))}
        </div>
      </section>

      <section id="testimonials" className="py-10">
        <h3 className="text-xl font-display font-semibold mb-8 text-primaryNavy text-center">What clients say</h3>
        
        {/* Horizontal Scrolling Testimonials */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll" style={{ width: 'max-content' }}>
            {/* First set of testimonials */}
            {testimonials.map(t => (
              <div key={t.id} className="flex-shrink-0 w-80 sm:w-96 mr-6 sm:mr-8">
                <TestimonialCard quote={t.quote} author={t.author} avatar={t.avatar} alt={t.alt} />
              </div>
            ))}
            {/* Second set for seamless loop */}
            {testimonials.map(t => (
              <div key={`duplicate-${t.id}`} className="flex-shrink-0 w-80 sm:w-96 mr-6 sm:mr-8">
                <TestimonialCard quote={t.quote} author={t.author} avatar={t.avatar} alt={t.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-primaryNavy mb-4">Let's Create Something Amazing</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Ready to transform your vision into reality? Get in touch and let's discuss how we can bring your ideas to life.
          </p>
          </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-primaryNavy mb-4 sm:mb-6">Get in Touch</h3>
                <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed font-sans">
                  Whether you have a specific project in mind or just want to explore possibilities, 
                  we're here to help you achieve your goals.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primaryNavy rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
              </div>
              <div>
                    <h4 className="font-semibold text-gray-900 font-sans">Phone</h4>
                    <p className="text-gray-600 font-sans">+251 923 988 838</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-accentRed rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
              </div>
              <div>
                    <h4 className="font-semibold text-gray-900 font-sans">Email</h4>
                    <p className="text-gray-600 font-sans">digitalsconnect@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
              </div>
              <div>
                    <h4 className="font-semibold text-gray-900 font-sans">Social</h4>
                    <a href="https://linktr.ee/connectdigitals" target="_blank" rel="noopener noreferrer" className="text-gray-600 font-sans hover:text-primaryNavy transition-colors duration-300">linktr.ee/connectdigitals</a>
                    {/* CACHE BUSTER v5 - Linktree Added */}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex space-x-4">
                  <a 
                    href="tel:+251923988838" 
                    className="flex-1 px-6 py-3 bg-primaryNavy text-white rounded-xl font-medium text-center hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    Call Now
                  </a>
                  <a 
                    href="mailto:digitalsconnect@gmail.com" 
                    className="flex-1 px-6 py-3 bg-accentRed text-white rounded-xl font-medium text-center hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg sm:text-xl font-display font-semibold text-primaryNavy mb-4 sm:mb-6">Send us a Message</h3>
              <form 
                className="space-y-6" 
                onSubmit={handleContactSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input 
                      name="name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryNavy focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white" 
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryNavy focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white" 
                      placeholder="you@company.com" 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input 
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryNavy focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white" 
                    placeholder="Project inquiry" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryNavy focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none" 
                    placeholder="Tell us about your project, goals, and how we can help..." 
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group relative w-full px-8 py-4 bg-primaryNavy text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="relative z-10">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                  </span>
                  <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
            </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 className="text-2xl font-display font-bold text-primaryNavy mb-4">Message Sent!</h3>
              <p className="text-gray-600 mb-6 leading-relaxed font-sans">
                Thank you for reaching out! We've received your message and will get back to you within 24 hours.
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="group relative flex-1 px-6 py-3 bg-primaryNavy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  aria-label="Close success message"
                >
                  <span className="relative z-10">Close</span>
                  <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
                <a
                  href="tel:+251923988838"
                  className="flex-1 px-6 py-3 border-2 border-primaryNavy text-primaryNavy rounded-xl font-semibold hover:bg-primaryNavy hover:text-white transition-all duration-300 text-center"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
