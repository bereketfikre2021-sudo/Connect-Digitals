import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import PortfolioCard from '../components/PortfolioCard'
import { useBackButtonClose } from '../hooks/useBackButtonClose'
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
    id: 'brand-design',
    title: '🏷️ Brand Design',
    services: [
      { 
        id: 1, 
        title: 'Logo Design', 
        desc: 'Distinctive logos that capture your brand essence.',
        details: 'Custom logo design that represents your business identity. We create memorable, versatile logos that work across all mediums—from business cards to billboards. Multiple concepts and revisions included to ensure your logo stands out.',
        icon: '✨' 
      },
      { 
        id: 2, 
        title: 'Visual Identity', 
        desc: 'Cohesive visual systems that define your brand.',
        details: 'Complete visual identity design including color palettes, typography, and imagery guidelines. We build a consistent look and feel that resonates with your audience and strengthens brand recognition across all touchpoints.',
        icon: '🎨' 
      },
      { 
        id: 3, 
        title: 'Brand Guidelines', 
        desc: 'Documentation that keeps your brand consistent.',
        details: 'Professional brand guideline documents that ensure consistent application of your brand across all materials. Includes logo usage, color specifications, typography rules, and do\'s and don\'ts for internal and external use.',
        icon: '📋' 
      }
    ]
  },
  {
    id: 'social-media-design',
    title: '📱 Social Media Design',
    services: [
      { 
        id: 10, 
        title: 'Social Media Creatives', 
        desc: 'Engaging content that resonates with your audience.',
        details: 'Stunning social media creatives including posts, stories, and profile graphics. We create content that stands out in the feed and drives engagement across Instagram, Facebook, LinkedIn, and more.',
        icon: '📲' 
      },
      { 
        id: 11, 
        title: 'Ad Design', 
        desc: 'High-converting ad creatives for paid campaigns.',
        details: 'Professional ad design for social media and digital advertising. We create scroll-stopping creatives optimized for each platform\'s specifications with compelling visuals that drive clicks and conversions.',
        icon: '🎯' 
      },
      { 
        id: 12, 
        title: 'Campaign Visuals', 
        desc: 'Cohesive visuals for integrated campaigns.',
        details: 'Complete campaign visual packages including banners, carousel ads, and multi-format assets. We ensure consistent messaging and branding across all campaign touchpoints for maximum impact.',
        icon: '🚀' 
      }
    ]
  },
  {
    id: 'print-layout',
    title: '📄 Print and Layout Design',
    services: [
      { 
        id: 4, 
        title: 'Marketing & Advertising Graphics', 
        desc: 'Compelling visuals for campaigns that drive results.',
        details: 'Professional marketing and advertising graphics for print, digital, and outdoor media. We create eye-catching designs that capture attention and communicate your message effectively across all advertising channels.',
        icon: '📈' 
      },
      { 
        id: 5, 
        title: 'Digital Media Design', 
        desc: 'Design assets for your digital presence.',
        details: 'Digital media design including web graphics, banners, and digital marketing materials. We provide design files ready for implementation across all digital platforms—design only, no printing services.',
        icon: '💻' 
      },
      { 
        id: 6, 
        title: 'Layout & Print Design', 
        desc: 'Polished layouts for reports, brochures, and print materials.',
        details: 'Professional layout and print design for brochures, reports, business cards, and corporate materials. We create clean, organized designs that present your information clearly and professionally.',
        icon: '📄' 
      }
    ]
  },
  {
    id: 'packaging-environmental-design',
    title: '📦 Packaging and Environmental Design',
    services: [
      { 
        id: 13, 
        title: 'Packaging Design', 
        desc: 'Eye-catching packaging that sells on the shelf.',
        details: 'Professional packaging design that attracts customers and protects your products. We create designs that not only look great but also comply with industry standards and work effectively in retail environments.',
        icon: '📦' 
      },
      { 
        id: 14, 
        title: 'Label Design', 
        desc: 'Labels that inform and captivate.',
        details: 'Custom label design for products, bottles, and packaging. We create labels that communicate essential information clearly while maintaining strong visual appeal and brand consistency.',
        icon: '🏷️' 
      },
      { 
        id: 15, 
        title: 'Signage', 
        desc: 'Signage that guides and brands your space.',
        details: 'Professional signage design for retail, offices, events, and environmental graphics. We create impactful signs—from wayfinding systems to branded wall graphics—that enhance your space and reinforce your brand.',
        icon: '🚧' 
      }
    ]
  },
  {
    id: 'web-ui-design',
    title: '🌐 Web & UI Design',
    services: [
      { 
        id: 7, 
        title: 'Website Design & Development', 
        desc: 'Websites that work beautifully on all devices.',
        details: 'Custom website design and development combining stunning visuals with seamless functionality. We create responsive websites that provide excellent user experience across desktop, tablet, and mobile devices.',
        icon: '🖥️' 
      },
      { 
        id: 8, 
        title: 'UI/UX Design', 
        desc: 'Intuitive interfaces that delight your users.',
        details: 'User interface and user experience design to make your digital products beautiful and easy to use. We focus on usability, accessibility, and creating seamless flows that guide users to their goals.',
        icon: '🎯' 
      },
      { 
        id: 9, 
        title: 'Wireframes & Prototypes', 
        desc: 'Blueprint your ideas before development.',
        details: 'Wireframing and prototyping services to visualize and test your product ideas before development. We create interactive prototypes that help validate concepts and streamline the development process.',
        icon: '📐' 
      }
    ]
  }
]

const portfolio = [
  { 
    id:2, 
    title:'Branding - Swan Clothing', 
    img:'/Portfolio/Brand Design/Full brand identity for swan clothing.webp',
    category:'brand-design',
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
    id:23, 
    title:'Branding - Alta Counseling Ethiopia', 
    img:'/Portfolio/Brand Design/Brand Identity - Alta Counseling Ethiopia.webp',
    category:'brand-design',
    alt:'Alta Counseling Ethiopia brand identity by Connect Digitals - professional branding for counseling practice',
    caseStudy: {
      challenge: "Alta Counseling needed a brand identity that would convey trust, professionalism, and care to potential clients.",
      solution: "Developed a cohesive brand identity with a calming color palette, thoughtful typography, and imagery that reflected their therapeutic approach.",
      results: [
        { metric: "Brand Trust", value: "Enhanced client confidence" },
        { metric: "Professional Image", value: "Elevated practice perception" },
        { metric: "Market Position", value: "Stronger competitive presence" }
      ]
    }
  },
  { 
    id:24, 
    title:'Branding - Dumas Properties', 
    img:'/Portfolio/Brand Design/Brand Identity - Dumas Properties.webp',
    category:'brand-design',
    alt:'Dumas Properties brand identity by Connect Digitals - real estate branding and visual identity',
    caseStudy: {
      challenge: "Dumas Properties needed a strong brand identity to establish credibility in the competitive real estate market.",
      solution: "Created a professional brand identity with sophisticated visuals that conveyed trust and expertise in property development.",
      results: [
        { metric: "Brand Recognition", value: "Stronger market presence" },
        { metric: "Client Trust", value: "Increased credibility" },
        { metric: "Professional Image", value: "Elevated brand perception" }
      ]
    }
  },
  { 
    id:25, 
    title:'Branding - Raya Hotel & Convention Center', 
    img:'/Portfolio/Brand Design/Brand Identity - Raya Hotel & Convention Center.webp',
    category:'brand-design',
    alt:'Raya Hotel & Convention Center brand identity by Connect Digitals - hospitality branding for Ethiopian hotel',
    caseStudy: {
      challenge: "Raya Hotel & Convention Center needed a distinctive brand identity that would position them as a premium hospitality destination.",
      solution: "Designed a comprehensive brand identity reflecting luxury, warmth, and Ethiopian hospitality for their hotel and convention facilities.",
      results: [
        { metric: "Brand Premium", value: "Elevated luxury positioning" },
        { metric: "Guest Experience", value: "Cohesive brand touchpoints" },
        { metric: "Market Appeal", value: "Stronger competitive edge" }
      ]
    }
  },
  { 
    id:26, 
    title:'Branding - Andegna Furniture', 
    img:'/Portfolio/Brand Design/Office Signage For Andegna Furniture.webp',
    category:'brand-design',
    alt:'Andegna Furniture branding by Connect Digitals - branded environmental design',
    caseStudy: {
      challenge: "Andegna Furniture needed a cohesive brand identity to reinforce their presence in their showroom and market.",
      solution: "Created comprehensive branding that integrated seamlessly with their space while strengthening brand visibility.",
      results: [
        { metric: "Brand Presence", value: "Enhanced in-space visibility" },
        { metric: "Professional Image", value: "Elevated showroom experience" },
        { metric: "Consistency", value: "Unified brand application" }
      ]
    }
  },
  { 
    id:27, 
    title:'Branding - Medavail', 
    img:'/Portfolio/Brand Design/Office Signage Medavail-.webp',
    category:'brand-design',
    alt:'Medavail branding by Connect Digitals - pharmaceutical company brand identity',
    caseStudy: {
      challenge: "Medavail needed professional branding that would reflect their pharmaceutical industry standards.",
      solution: "Designed comprehensive branding with clean, professional aesthetics suitable for a healthcare environment.",
      results: [
        { metric: "Brand Authority", value: "Professional corporate presence" },
        { metric: "Consistency", value: "Brand-aligned signage" },
        { metric: "Trust", value: "Enhanced credibility" }
      ]
    }
  },
  { 
    id:3, 
    title:'Finix - Digital Marketing Assets', 
    img:'/Portfolio/Social Media Design/Social Media Design For Finix Bet-3.webp',
    category:'social-media-design',
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
    id:7, 
    title:'Ace Stainless Steel - Social Media Design', 
    img:'/Portfolio/Social Media Design/Social Media Design For Ace Stainless Still-2.webp',
    category:'social-media-design',
    alt:'Ace Stainless Steel social media design by Connect Digitals - professional social media creatives for Ethiopian stainless steel company',
    caseStudy: {
      challenge: "Ace Stainless Steel needed professional social media content to showcase their products and attract B2B customers.",
      solution: "Designed a cohesive series of social media templates featuring their products with clean, professional aesthetics that reinforced brand credibility.",
      results: [
        { metric: "Engagement", value: "Increased social media engagement" },
        { metric: "Brand Visibility", value: "Stronger online presence" },
        { metric: "Lead Generation", value: "More qualified inquiries" }
      ]
    }
  },
  { 
    id:8, 
    title:'Niqat Coffee - Social Media Design', 
    img:'/Portfolio/Social Media Design/Social Media Design for niqat coffee-11.webp',
    category:'social-media-design',
    alt:'Niqat Coffee social media design by Connect Digitals - coffee brand social media creatives for Ethiopian coffee company',
    caseStudy: {
      challenge: "Niqat Coffee wanted to build a strong social media presence to connect with coffee enthusiasts and increase brand awareness.",
      solution: "Created eye-catching social media designs that highlighted their premium coffee products with lifestyle imagery and consistent branding.",
      results: [
        { metric: "Followers", value: "Growth in social following" },
        { metric: "Engagement", value: "Higher interaction rates" },
        { metric: "Brand Recall", value: "Improved brand recognition" }
      ]
    }
  },
  { 
    id:9, 
    title:'Task Plug - Social Media Template', 
    img:'/Portfolio/Social Media Design/Social Media Template - Task Plug.webp',
    category:'social-media-design',
    alt:'Task Plug social media template by Connect Digitals - tech startup social media design for Ethiopian SaaS company',
    caseStudy: {
      challenge: "Task Plug needed professional social media templates to establish their brand presence as a tech startup.",
      solution: "Developed a set of modern, branded social media templates that conveyed innovation and professionalism across all platforms.",
      results: [
        { metric: "Brand Consistency", value: "Unified visual identity" },
        { metric: "Content Efficiency", value: "Faster content creation" },
        { metric: "Professional Image", value: "Elevated brand perception" }
      ]
    }
  },
  { 
    id:10, 
    title:'Karaoke Event - Social Media Design', 
    img:'/Portfolio/Social Media Design/karaoke event social media.webp',
    category:'social-media-design',
    alt:'Karaoke event social media design by Connect Digitals - event promotion graphics and social media creatives',
    caseStudy: {
      challenge: "A karaoke event needed eye-catching social media content to promote the event and attract attendees.",
      solution: "Designed vibrant, engaging social media creatives that captured the fun and energy of the event while driving awareness and ticket sales.",
      results: [
        { metric: "Event Reach", value: "Increased social media impressions" },
        { metric: "Engagement", value: "Higher interaction and shares" },
        { metric: "Attendance", value: "Strong event turnout" }
      ]
    }
  },
  { 
    id:11, 
    title:'PTGR - Social Media Template', 
    img:'/Portfolio/Social Media Design/Social Media Template - PTGR.webp',
    category:'social-media-design',
    alt:'PTGR social media template by Connect Digitals - professional social media design template',
    caseStudy: {
      challenge: "PTGR needed professional social media templates to maintain consistent branding across their digital presence.",
      solution: "Created a cohesive set of social media templates with modern design elements that ensured brand consistency and streamlined content creation.",
      results: [
        { metric: "Brand Consistency", value: "Unified visual identity" },
        { metric: "Content Efficiency", value: "Faster content creation" },
        { metric: "Professional Image", value: "Elevated brand perception" }
      ]
    }
  },
  { 
    id:4, 
    title:'Lensa Fashion - Packaging Design', 
    img:'/Portfolio/Packaging & Enviromental Design/Product Packaging for Lensa Fashion.webp',
    category:'packaging-environmental-design',
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
    id:12, 
    title:'Dumas Properties - Branding', 
    img:'/Portfolio/Packaging & Enviromental Design/Branding Dumas Properties.webp',
    category:'packaging-environmental-design',
    alt:'Dumas Properties branding design by Connect Digitals - real estate branding and environmental design',
    caseStudy: {
      challenge: "Dumas Properties needed cohesive branding to establish their presence in the real estate market.",
      solution: "Created comprehensive branding including visual identity and environmental design elements that reinforced their professional image.",
      results: [
        { metric: "Brand Recognition", value: "Stronger market presence" },
        { metric: "Professional Image", value: "Elevated brand perception" },
        { metric: "Client Trust", value: "Increased credibility" }
      ]
    }
  },
  { 
    id:13, 
    title:'Toca Speciality Coffee - Packaging Bag', 
    img:'/Portfolio/Packaging & Enviromental Design/Coffee Packaging Bag - Toca Speciality Coffee .webp',
    category:'packaging-environmental-design',
    alt:'Toca Speciality Coffee packaging bag design by Connect Digitals - premium coffee packaging for Ethiopian specialty coffee brand',
    caseStudy: {
      challenge: "Toca Speciality Coffee wanted premium packaging that would protect their coffee and appeal to discerning customers.",
      solution: "Designed a functional and visually appealing coffee packaging bag that highlighted the brand and product quality.",
      results: [
        { metric: "Product Appeal", value: "Enhanced shelf presence" },
        { metric: "Brand Consistency", value: "Unified brand experience" },
        { metric: "Customer Satisfaction", value: "Positive packaging feedback" }
      ]
    }
  },
  { 
    id:14, 
    title:'Raya Hotel & Convention Center - Product & Packaging', 
    img:'/Portfolio/Packaging & Enviromental Design/Product & Packaging - Raya.webp',
    category:'packaging-environmental-design',
    alt:'Raya Hotel & Convention Center product and packaging design by Connect Digitals - product packaging and environmental design',
    caseStudy: {
      challenge: "Raya Hotel & Convention Center needed product packaging that would stand out and effectively communicate their brand values.",
      solution: "Developed distinctive product and packaging design that combined functionality with strong visual appeal.",
      results: [
        { metric: "Shelf Appeal", value: "Improved retail visibility" },
        { metric: "Brand Impact", value: "Stronger brand recognition" },
        { metric: "Market Position", value: "Competitive differentiation" }
      ]
    }
  },
  { 
    id:15, 
    title:'Rollup Banners - Various Companies', 
    img:'/Portfolio/Packaging & Enviromental Design/Rollup-Banners-Various Companies.webp',
    category:'packaging-environmental-design',
    alt:'Rollup banners for various companies by Connect Digitals - event and environmental signage design',
    caseStudy: {
      challenge: "Multiple clients needed professional rollup banners for events, exhibitions, and retail spaces.",
      solution: "Designed impactful rollup banners with strong visuals and clear messaging for various brands across different industries.",
      results: [
        { metric: "Visibility", value: "Increased brand exposure" },
        { metric: "Professional Impact", value: "Enhanced event presence" },
        { metric: "Consistency", value: "Brand-aligned signage" }
      ]
    }
  },
  { 
    id:16, 
    title:"Maleda - Signage Design", 
    img:"/Portfolio/Packaging & Enviromental Design/Signage for maleda'.webp",
    category:'packaging-environmental-design',
    alt:"Maleda signage design by Connect Digitals - environmental signage and wayfinding for Ethiopian coffee brand",
    caseStudy: {
      challenge: "Maleda needed professional signage to guide customers and reinforce their brand in physical spaces.",
      solution: "Created clear, branded signage that improved wayfinding and strengthened brand presence in retail and event environments.",
      results: [
        { metric: "Customer Experience", value: "Improved navigation" },
        { metric: "Brand Visibility", value: "Stronger in-store presence" },
        { metric: "Professional Image", value: "Elevated brand perception" }
      ]
    }
  },
  { 
    id:5, 
    title:'Medavail Pharmaceuticals - Professional Company Profile', 
    img:'/Portfolio/Print & Layout Design/Company Profile - Medavail Pharmaceuticals.webp',
    category:'print-layout',
    alt:'Medavail Pharmaceuticals company profile design by Connect Digitals - modern layout, corporate branding, and business presentation materials for Ethiopian companies',
    caseStudy: {
      challenge: "Medavail Pharmaceuticals needed a professional company profile that would effectively communicate their expertise and attract high-value business partnerships.",
      solution: "Created a comprehensive company profile with modern design, compelling copy, infographics, and professional photography that showcased their capabilities and achievements.",
      results: [
        { metric: "Partnership Inquiries", value: "300% increase in business inquiries" },
        { metric: "Presentation Success", value: "100% success rate in client presentations" },
        { metric: "Brand Authority", value: "Established industry leadership position" }
      ]
    }
  },
  { 
    id:17, 
    title:'Raya Hotel & Convention Center - Business Card', 
    img:'/Portfolio/Print & Layout Design/Business Card - Raya.webp',
    category:'print-layout',
    alt:'Raya Hotel & Convention Center business card design by Connect Digitals - professional print design for Ethiopian business',
    caseStudy: {
      challenge: "Raya Hotel & Convention Center needed professional business cards that would make a strong first impression and support their brand.",
      solution: "Designed elegant business cards with clear typography and brand-consistent visuals for effective networking.",
      results: [
        { metric: "Brand Impression", value: "Professional first impression" },
        { metric: "Consistency", value: "Unified brand identity" },
        { metric: "Networking", value: "Enhanced business connections" }
      ]
    }
  },
  { 
    id:18, 
    title:'Prime Ethiopia - Flyer', 
    img:'/Portfolio/Print & Layout Design/Flyer Prime Ethiopia.webp',
    category:'print-layout',
    alt:'Prime Ethiopia flyer design by Connect Digitals - promotional print materials',
    caseStudy: {
      challenge: "Prime Ethiopia needed eye-catching flyers to promote their offerings and reach their target audience.",
      solution: "Created compelling flyer designs with strong visuals and clear messaging for maximum impact.",
      results: [
        { metric: "Audience Reach", value: "Increased event awareness" },
        { metric: "Visual Impact", value: "Strong promotional presence" },
        { metric: "Response Rate", value: "Improved customer engagement" }
      ]
    }
  },
  { 
    id:19, 
    title:'Dumas Properties - Letterhead Design', 
    img:'/Portfolio/Print & Layout Design/Letterhead Design- Dumas.webp',
    category:'print-layout',
    alt:'Dumas Properties letterhead design by Connect Digitals - professional corporate stationery',
    caseStudy: {
      challenge: "Dumas Properties needed professional letterhead that would reinforce their brand in official communications.",
      solution: "Designed elegant letterhead with sophisticated typography and brand elements for professional correspondence.",
      results: [
        { metric: "Professional Image", value: "Elevated corporate presence" },
        { metric: "Brand Consistency", value: "Consistent brand application" },
        { metric: "Credibility", value: "Enhanced business credibility" }
      ]
    }
  },
  { 
    id:20, 
    title:'Niqat Coffee - Menu & Brochure', 
    img:'/Portfolio/Print & Layout Design/Menu & Broshure for niqat coffee.webp',
    category:'print-layout',
    alt:'Niqat Coffee menu and brochure design by Connect Digitals - cafe print materials',
    caseStudy: {
      challenge: "Niqat Coffee wanted menu and brochure designs that would showcase their offerings and enhance the customer experience.",
      solution: "Created cohesive menu and brochure layouts with appetizing imagery and clear hierarchy for easy navigation.",
      results: [
        { metric: "Customer Experience", value: "Improved dining experience" },
        { metric: "Brand Appeal", value: "Enhanced brand perception" },
        { metric: "Sales", value: "Increased product visibility" }
      ]
    }
  },
  { 
    id:22, 
    title:'YAT Construction PLC - Stationery Design', 
    img:'/Portfolio/Print & Layout Design/Stationary Design YAT-Construction-PLC-.webp',
    category:'print-layout',
    alt:'YAT Construction PLC stationery design by Connect Digitals - corporate print design for Ethiopian construction company',
    caseStudy: {
      challenge: "YAT Construction PLC needed professional stationery that would represent their engineering and construction expertise.",
      solution: "Developed a complete stationery suite with strong corporate branding for official communications and presentations.",
      results: [
        { metric: "Corporate Image", value: "Professional brand presence" },
        { metric: "Consistency", value: "Unified visual identity" },
        { metric: "Authority", value: "Established industry credibility" }
      ]
    }
  },
  { 
    id:28, 
    title:'Finix Bet - Website Banner', 
    img:'/Portfolio/Web Design/Website Banner For Finix Bet-10.webp',
    category:'web-ui-design',
    alt:'Finix Bet website banner design by Connect Digitals - fintech web design for Ethiopian betting platform',
    caseStudy: {
      challenge: "Finix Bet needed compelling website banners to engage users and communicate their brand across their digital platform.",
      solution: "Designed eye-catching website banners with strong visuals and clear messaging that aligned with their fintech brand identity.",
      results: [
        { metric: "User Engagement", value: "Increased website interaction" },
        { metric: "Brand Consistency", value: "Cohesive digital presence" },
        { metric: "Conversion", value: "Improved user conversion" }
      ]
    }
  },
  { 
    id:29, 
    title:'Finix Bet - Website Banner (Set 2)', 
    img:'/Portfolio/Web Design/Website Banner For Finix Bet-4.webp',
    category:'web-ui-design',
    alt:'Finix Bet website banner design by Connect Digitals - promotional web graphics for Ethiopian fintech',
    caseStudy: {
      challenge: "Finix Bet required multiple banner variations for different campaigns and promotions on their website.",
      solution: "Created a series of professional website banners with consistent branding for various promotional needs.",
      results: [
        { metric: "Campaign Flexibility", value: "Multiple banner options" },
        { metric: "Visual Impact", value: "Strong promotional presence" },
        { metric: "Brand Cohesion", value: "Unified digital experience" }
      ]
    }
  },
  { 
    id:30, 
    title:'Finix Bet - Website Banner (Set 3)', 
    img:'/Portfolio/Web Design/Website Banner For Finix Bet-5.webp',
    category:'web-ui-design',
    alt:'Finix Bet website banner design by Connect Digitals - web UI design for Ethiopian betting platform',
    caseStudy: {
      challenge: "Finix Bet needed additional web creatives to maintain fresh, engaging content across their platform.",
      solution: "Designed supplementary website banners that maintained brand consistency while offering fresh visual appeal.",
      results: [
        { metric: "Content Variety", value: "Expanded creative options" },
        { metric: "User Experience", value: "Enhanced visual appeal" },
        { metric: "Brand Recognition", value: "Consistent digital identity" }
      ]
    }
  }
]

const caseStudiesData = [
  { id: 1, client: 'Andegna Furniture', title: 'Product Catalog Design', img: '/Case Studies/Andegna Cataloge.webp', overview: 'Andegna Furniture required a clean, professional product catalog to present its furniture collections clearly and attractively to clients.', challenge: ['Existing product presentation lacked structure and visual consistency', 'Needed a catalog that was easy to navigate and client-friendly', 'Required balance between aesthetics and clarity'], solution: 'I designed a simplified, well-structured product catalog with clear hierarchy, consistent layouts, and refined typography. The focus was on making products easy to view and compare while maintaining a polished brand appearance.', role: ['Catalog layout and design', 'Visual hierarchy and typography', 'Product presentation consistency'], outcome: 'A professional, easy-to-use product catalog that improved product presentation and supported client decision-making.' },
  { id: 2, client: 'Alta Counseling', title: 'Rebranding & Visual Identity', img: '/Case Studies/Alta Counseling.webp', overview: 'Alta Counseling needed a refreshed brand identity that communicated trust, calmness, and professionalism.', challenge: ['Outdated visual identity', 'Need for a more approachable and consistent look', 'Required alignment across digital and print materials'], solution: 'I redesigned the brand identity using a restrained color palette, clean typography, and a cohesive visual system focused on clarity and emotional comfort.', role: ['Brand identity redesign', 'Logo refinement', 'Visual system development'], outcome: 'A modern, cohesive visual identity that strengthened trust and improved brand consistency across platforms.' },
  { id: 3, client: 'Niqat Coffee', title: 'Social Media Campaign & Digital Design', img: '/Case Studies/Social Media Design for niqat coffee.webp', overview: 'Niqat Coffee needed to build its social media presence from scratch and establish a consistent visual voice.', challenge: ['No existing social media accounts', 'Lack of visual direction', 'Need to increase engagement and visibility'], solution: 'I created the social media accounts, defined a visual direction, and designed consistent content aligned with the brand\'s personality and audience.', role: ['Social media visual design', 'Content creation', 'Campaign consistency'], outcome: 'Improved engagement, stronger brand recognition, and a consistent digital presence.' },
  { id: 4, client: 'MedAvail Pharmaceuticals', title: 'Company Profile & Corporate Design', img: '/Case Studies/Company Profile - Medavail Pharmaceuticals.webp', overview: 'MedAvail Pharmaceuticals required a professional company profile to communicate its mission, services, and credibility to partners and stakeholders.', challenge: ['Information-heavy content needed clear structure', 'Required a serious, trustworthy visual tone', 'Needed a document suitable for corporate and medical contexts'], solution: 'I designed a clean, structured company profile that emphasized readability, hierarchy, and professionalism. The layout balanced informative content with a polished visual presentation.', role: ['Company profile layout and design', 'Information hierarchy', 'Visual consistency'], outcome: 'A clear, professional company profile that supported corporate communication and reinforced brand credibility.' }
]

const blogData = [
  { id: 1, title: 'Branding', shortDesc: 'Building strong brand identities that resonate', img: '/Blog/Branding.webp', slug: 'branding', description: 'A strong brand identity is the foundation of every successful business. It goes far beyond just a logo—it encompasses your visual language, messaging, color palette, typography, and the emotional connection you create with your audience.\n\nEffective branding builds recognition, trust, and loyalty over time. When customers see your brand consistently across touchpoints, they develop a sense of familiarity that makes choosing your business feel natural. We help businesses develop cohesive brand systems that communicate their values, differentiate them from competitors, and set them apart in the market.\n\nFrom startups to established enterprises, investing in thoughtful branding pays dividends. A well-crafted brand identity can increase perceived value, command premium pricing, and create lasting customer relationships. The key is consistency: every piece of communication—from your website to your business cards to your social media—should feel unmistakably like you.' },
  { id: 2, title: 'Consistency', shortDesc: 'Why consistency matters in design', img: '/Blog/Consistency.webp', slug: 'consistency', description: 'Consistency in design creates familiarity and builds trust with your audience. When your visuals, tone, and messaging align across all touchpoints—from social media to print materials to packaging—you reinforce your brand\'s identity and make it easier for customers to recognize and remember you.\n\nThink of your favorite brands: chances are, you can identify them instantly by their colors, typography, or visual style. That recognition doesn\'t happen by accident. It\'s the result of meticulous attention to consistency across every customer interaction. Consistent design reduces cognitive load for your audience—they don\'t have to work to understand that this new post or ad belongs to you.\n\nInconsistency, on the other hand, can confuse customers and dilute your brand\'s impact. Mixed fonts, clashing colors, and varying tones make your brand feel unprofessional and forgettable. Whether you\'re a small business or a growing enterprise, maintaining design consistency should be a priority in every project you undertake.' },
  { id: 3, title: 'Design Principles', shortDesc: 'Core principles that guide great design', img: '/Blog/Design principles.webp', slug: 'design-principles', description: 'Great design is guided by fundamental principles that have stood the test of time. Balance, hierarchy, contrast, alignment, repetition, and whitespace—these aren\'t arbitrary rules but proven frameworks that help create visuals that are both beautiful and effective.\n\nBalance distributes visual weight so that no single element dominates awkwardly. Hierarchy guides the eye to what matters most, ensuring your message gets across. Contrast creates emphasis and makes content readable. Alignment creates order and professionalism. Repetition builds recognition and reinforces your brand. And whitespace—often overlooked—gives your design room to breathe and helps important elements stand out.\n\nUnderstanding these principles isn\'t about following rigid rules; it\'s about having a toolkit to make intentional decisions. When a design feels "off," it\'s often because one of these principles has been neglected. At Connect Digitals, we apply these principles to every project, ensuring your designs communicate clearly, look professional, and resonate with your target audience.' },
  { id: 4, title: 'Graphic Design Trends 2026', shortDesc: 'Trends shaping the design industry', img: '/Blog/Graphic Design Trends 2026.webp', slug: 'graphic-design-trends-2026', description: 'The design landscape continues to evolve with new trends each year, and 2026 is no exception. We\'re seeing bold typography make a comeback, with oversized headlines and expressive typefaces that demand attention. Sustainable design choices are increasingly important as brands align their visuals with environmental values.\n\nAI-assisted creativity is transforming how designers work—not replacing human creativity, but augmenting it. Tools that streamline repetitive tasks free up time for strategic thinking and unique ideas. There\'s also a renewed focus on authenticity: consumers are drawn to brands that feel genuine rather than overly polished or generic.\n\nEmerging 2026 trends include dynamic 3D elements, immersive spatial design, and hyper-personalized visuals. Nostalgic aesthetics continue to resonate, with retro-futurism and Y2K-inspired graphics gaining traction. Micro-interactions and motion design are becoming essential for digital experiences.\n\nStaying informed about these trends helps brands remain relevant while maintaining their unique voice in a crowded marketplace. The key is selective adoption: not every trend fits every brand. Working with experienced designers helps you identify which trends align with your identity and goals, and which to skip. At Connect Digitals, we help Ethiopian businesses navigate these trends while building designs that stand the test of time.' }
]

const faqItems = [
  { q: 'How long does a typical project take?', a: 'Project timelines vary by scope. Simple designs like logos or business cards typically take 5-7 business days. Complex projects like full brand identity or website development can take 10-21 business days. We provide detailed timelines in our initial quote and keep you updated throughout the process.' },
  { q: 'What payment methods do you accept?', a: 'We accept bank transfer, mobile money (Ethiopia), PayPal for international clients, and cryptocurrency (Bitcoin, Ethereum). A 50% deposit is required before we begin work, with the remaining 50% due upon project completion and your approval.' },
  { q: 'Do you offer revisions?', a: 'Yes! Each package includes revision rounds—Beginner (2 rounds), Professional (5 rounds), and Premium (unlimited revisions). We want you to be completely satisfied with the final result. Additional revisions are available for 1,500 ETB per round if needed.' },
  { q: 'Do you work with clients outside Ethiopia?', a: 'Absolutely! We work with businesses and individuals worldwide. We collaborate remotely via email, video calls, and project management tools. International clients can pay via PayPal or cryptocurrency for convenience.' },
  { q: 'What is included in the design process?', a: 'Our process includes an initial consultation to understand your vision, a creative brief, concept sketches, design iterations based on your feedback, and final delivery of all source files. We maintain clear communication throughout and ensure you\'re involved at every key stage.' },
  { q: 'How do I get started?', a: 'Simply fill out our quote request form or contact us directly. We\'ll schedule a brief call or chat to discuss your project, goals, and budget. From there, we\'ll provide a custom proposal and timeline. No obligation—we\'re happy to answer questions before you commit.' }
]

const testimonials = [
  { 
    id:1, 
    quote:'Bereket transformed our small non-profit\'s fundraising campaign with his creative vision. The emotional storytelling in our donation posters increased contributions by 180% in just 3 months. His understanding of our mission made all the difference.', 
    author:'— Gedyon Megersa, Non-Profit Director',
    avatar:'/Testimonials/Gedyon Megersa.webp',
    alt:'Gedyon Megersa, Non-Profit Director - satisfied client testimonial for Connect Digitals graphic design services in Ethiopia'
  },
  { 
    id:2, 
    quote:'Our tech startup needed a complete brand identity that would stand out in the competitive market. Connect Digitals delivered a modern logo, website design, and marketing materials that perfectly captured our innovative spirit. Investors loved our presentation!', 
    author:'— Dagmawi Yeshiwas, Creative Director',
    avatar:'/Testimonials/Dagmawi Yeshiwas.webp',
    alt:'Dagmawi Yeshiwas, Creative Director - happy client testimonial for Connect Digitals branding and web design services in Addis Ababa'
  },
  { 
    id:3, 
    quote:'I needed a professional portfolio website that would showcase my digital marketing skills. Bereket created a stunning, responsive design that landed me 3 new clients within the first month. The attention to detail was incredible.', 
    author:'— Abenezer A, Digital Marketer',
    avatar:'/Testimonials/Abenezer Alemayehu.webp',
    alt:'Abenezer A, Digital Marketer - successful client testimonial for Connect Digitals portfolio website design services in Ethiopia'
  },
  { 
    id:4, 
    quote:'Running a local restaurant, I needed eye-catching menus and social media content. Connect Digitals created beautiful designs that made our food look irresistible. Our Instagram followers grew by 300% and reservations doubled!', 
    author:'— Kassaye Getachew, Business Owner',
    avatar:'/Testimonials/Kassaye Getachew.webp',
    alt:'Kassaye Getachew, Business Owner - delighted client testimonial for Connect Digitals restaurant menu and social media design services in Ethiopia'
  },
  { 
    id:5, 
    quote:'As a freelance artist, I needed a cohesive brand that would attract high-end clients. Bereket designed a sophisticated logo and business cards that perfectly represented my artistic style. The quality exceeded my expectations.', 
    author:'— Micky, Digital Artist',
    avatar:'/Testimonials/Mikiyas Yosef.webp',
    alt:'Micky, Digital Artist - pleased client testimonial for Connect Digitals logo design and business card services in Addis Ababa'
  },
  { 
    id:6, 
    quote:'Running my architecture firm, I needed a professional brand identity that would reflect the quality of our work. Connect Digitals created elegant designs for our business cards, portfolio presentations, and marketing materials. The brand identity has helped us secure high-profile projects and we receive consistent compliments from clients.', 
    author:'— Tesfahun Tsegaye, Expert Architect',
    avatar:'/Testimonials/Tesfahun Tsegaye.webp',
    alt:'Tesfahun Tsegaye, Expert Architect - satisfied client testimonial for Connect Digitals brand identity and design services in Ethiopia'
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
  const closeSuccessModal = useBackButtonClose(showSuccessModal, () => setShowSuccessModal(false))
  
  // Hero slideshow state
  const [currentSlide, setCurrentSlide] = useState(0)
  const [aboutSlide, setAboutSlide] = useState(0)
  const [faqSlide, setFaqSlide] = useState(0)
  const [portfolioCategory, setPortfolioCategory] = useState('brand-design')
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null)
  const closeCaseStudyModal = useBackButtonClose(!!selectedCaseStudy, () => setSelectedCaseStudy(null))
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [copyLinkFeedback, setCopyLinkFeedback] = useState(false)
  const closeBlogModal = useBackButtonClose(!!selectedBlog, () => { setSelectedBlog(null); setCopyLinkFeedback(false) })
  const heroImages = [
    { src: '/Hero Images/Brand Identity - Havana PLC.webp', alt: 'Brand identity for Havana PLC by Connect Digitals - professional branding and design' },
    { src: '/Hero Images/Branding Raya Hotel & Convention Center.webp', alt: 'Branding for Raya Hotel & Convention Center by Connect Digitals - hospitality branding' },
    { src: '/Hero Images/Company Logo Rebranding - Alta Counseling Ethiopia.webp', alt: 'Company logo rebranding for Alta Counseling Ethiopia by Connect Digitals' },
    { src: '/Hero Images/Full Brand Identity Dayer Enginnering PLC.webp', alt: 'Full brand identity for Dayer Engineering PLC by Connect Digitals - engineering branding' },
    { src: '/Hero Images/Maleda-Coffee-7b6d183c.webp', alt: 'Maleda Coffee brand identity by Connect Digitals - coffee branding and design' }
  ]
  
  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000) // Change slide every 4 seconds
    
    return () => clearInterval(interval)
  }, [heroImages.length])

  // Auto-advance about/mission/values carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setAboutSlide((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-advance FAQ carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setFaqSlide((prev) => (prev + 1) % faqItems.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Close success modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showSuccessModal) closeSuccessModal()
    }
    if (showSuccessModal) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showSuccessModal, closeSuccessModal])

  // Close case study modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedCaseStudy) closeCaseStudyModal()
    }
    if (selectedCaseStudy) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCaseStudy, closeCaseStudyModal])

  // Close blog modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedBlog) closeBlogModal()
    }
    if (selectedBlog) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedBlog, closeBlogModal])

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
        headers: { 'Accept': 'application/json' }
      })
      if (response.ok) {
        setShowSuccessModal(true)
        e.target.reset()
      } else throw new Error('Form submission failed')
    } catch (error) {
      console.error('Error:', error)
      alert('There was an error submitting your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <main id="main-content" className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-0 overflow-x-hidden min-w-0">
      <section id="hero" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 lg:py-12" aria-label="Hero section">
        <div>
          <motion.h1 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-primaryNavy leading-tight">Connect. <span className="text-gold">Create</span>. <span className="text-accentRed">Captivate</span>.</motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} className="mt-4 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
            We connect your <span className="text-primaryNavy font-semibold">vision</span>, create powerful brands, and <span className="text-accentRed font-semibold">captivate</span> your audience with thoughtful design and strategy.
          </motion.p>

          <div className="mt-6 sm:mt-8 flex flex-row items-center gap-2 sm:gap-4">
            <button 
              onClick={onOpenQuoteModal}
              className="group relative flex-1 sm:flex-initial min-w-0 px-4 sm:px-8 py-2.5 sm:py-4 bg-primaryNavy text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden text-center"
              aria-label="Open quote request form"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            <a 
              href="#portfolio" 
              className="group relative flex-1 sm:flex-initial min-w-0 px-4 sm:px-8 py-2.5 sm:py-4 border-2 border-primaryNavy text-primaryNavy rounded-xl font-semibold text-sm sm:text-base hover:border-accentRed hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center overflow-hidden"
              aria-label="Navigate to portfolio section"
            >
              <span className="relative z-10">View Portfolio</span>
              <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          </div>

          <div className="mt-6 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3" role="region" aria-label="Company statistics">
            <div className="text-center group" ref={projectsRef}>
              <div className="bg-gradient-to-br from-primaryNavy to-primaryNavy rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, #000F33, #1a2a5c)' }}>
                <div className="text-lg sm:text-xl font-bold text-white mb-0.5 group-hover:scale-105 transition-transform duration-300" aria-label={`${projectsCount} projects completed`}>{projectsCount}+</div>
                <div className="text-gray-200 font-medium text-[10px] sm:text-xs">Projects</div>
                <div className="w-4 sm:w-6 h-0.5 bg-white rounded-full mx-auto mt-1 opacity-60"></div>
              </div>
            </div>
            
            <div className="text-center group" ref={satisfactionRef}>
              <div className="bg-gradient-to-br from-accentRed to-accentRed rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, #EC1C24, #c41e3a)' }}>
                <div className="text-lg sm:text-xl font-bold text-white mb-0.5 group-hover:scale-105 transition-transform duration-300" aria-label={`${satisfactionCount} percent client satisfaction`}>{satisfactionCount}%</div>
                <div className="text-red-100 font-medium text-[10px] sm:text-xs">Satisfaction</div>
                <div className="w-4 sm:w-6 h-0.5 bg-white rounded-full mx-auto mt-1 opacity-60"></div>
              </div>
            </div>
            
            <div className="text-center group" ref={experienceRef}>
              <div className="bg-gradient-to-br from-gold to-gold rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, #D4AF37, #b8941f)' }}>
                <div className="text-lg sm:text-xl font-bold text-white mb-0.5 group-hover:scale-105 transition-transform duration-300" aria-label={`${experienceCount} years of experience`}>{experienceCount}+</div>
                <div className="text-yellow-100 font-medium text-[10px] sm:text-xs">Years Exp.</div>
                <div className="w-4 sm:w-6 h-0.5 bg-white rounded-full mx-auto mt-1 opacity-60"></div>
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
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl" role="img" aria-label="Connect Digitals workspace showcase">
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
              
              {/* Progress Bar - Glassmorphism */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/20 backdrop-blur-sm">
                <motion.div 
                  className="h-full bg-primaryNavy/80 backdrop-blur-sm"
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
        <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="relative min-h-[280px]">
            {[
              /* Slide 1: Who we are */
              <div key="who" className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primaryNavy rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-display font-bold text-primaryNavy">Who we are</h2>
                </div>
                <p className="text-gray-700 max-w-xl leading-relaxed font-sans text-sm sm:text-base">
                  At <span className="font-semibold text-primaryNavy">Connect Digitals</span>, we believe every successful brand starts with a meaningful connection. Founded by <span className="font-bold text-primaryNavy">Bereket Fikre</span>, a brand builder with <span className="font-semibold text-accentRed">5+ years of experience</span>.
                </p>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group relative mt-4 self-start px-6 py-2.5 bg-primaryNavy text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10">Work with us</span>
                  <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>,
              /* Slide 2: Our Mission */
              <div key="mission" className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accentRed rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-display font-bold text-primaryNavy">Our Mission</h2>
                </div>
                <p className="text-neutralDark leading-relaxed font-sans text-sm sm:text-base">
                  To empower businesses with <span className="font-semibold text-accentRed">exceptional design solutions</span> that build lasting connections. We transform complex ideas into simple, powerful visual stories.
                </p>
              </div>,
              /* Slide 3: Our Vision */
              <div key="vision" className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-display font-bold text-primaryNavy">Our Vision</h2>
                </div>
                <p className="text-neutralDark leading-relaxed font-sans text-sm sm:text-base">
                  To become the <span className="font-semibold text-gold">leading creative partner</span> in Ethiopia and beyond, giving every business access to world-class design.
                </p>
              </div>,
              /* Slide 4: Our Core Values */
              <div key="values" className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primaryNavy rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-display font-bold text-primaryNavy">Our Core Values</h2>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-accentRed/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-accentRed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-display font-semibold text-primaryNavy text-xs mb-1">Quality First</h4>
                    <p className="text-neutralDark text-xs font-sans">Every project gets our full attention.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="font-display font-semibold text-primaryNavy text-xs mb-1">Client Partnership</h4>
                    <p className="text-neutralDark text-xs font-sans">We work as your team.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-primaryNavy/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-primaryNavy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="font-display font-semibold text-primaryNavy text-xs mb-1">Innovation</h4>
                    <p className="text-neutralDark text-xs font-sans">We evolve with trends.</p>
                  </div>
                </div>
              </div>
            ].map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === aboutSlide ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
                style={{ pointerEvents: index === aboutSlide ? 'auto' : 'none' }}
              >
                {slide}
              </motion.div>
            ))}
          </div>
          {/* Slide indicators */}
          <div className="flex justify-center gap-2 py-4 border-t border-gray-100">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setAboutSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === aboutSlide ? 'bg-primaryNavy scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="text-center mt-8 sm:mt-10">
          <p className="text-sm font-sans font-medium uppercase tracking-wider mb-6"><span className="text-accentRed">Trusted</span> by</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
            {[
              { src: '/Trusted By/Andegna-Logo-Outline-7565946d.webp', alt: 'Andegna' },
              { src: '/Trusted By/Gedylaw-53a5feb2.webp', alt: 'Gedylaw' },
              { src: '/Trusted By/Medavail-logo-e49b9b88.webp', alt: 'Medavail' },
              { src: '/Trusted By/Niqat-be4b5d56.webp', alt: 'Niqat' },
              { src: '/Trusted By/PDC-Logo-2483595d.webp', alt: 'PDC' },
              { src: '/Trusted By/Prime-All-3a38c568.webp', alt: 'Prime All' }
            ].map((logo, index) => (
              <div key={index} className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/80 border border-gray-100 shadow-sm grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 overflow-hidden shrink-0 p-0">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="block w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-6 sm:py-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-display font-semibold text-primaryNavy">Our Services</h3>
          <button
            onClick={onOpenPricingModal}
            className="group relative px-5 sm:px-8 py-3 sm:py-4 bg-accentRed text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            aria-label="View our pricing packages and service costs"
          >
            <span className="relative z-10">View Pricing</span>
            <div className="absolute inset-0 bg-primaryNavy transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>

        {/* Minimal layout - all screen sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {serviceCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg sm:text-xl" aria-hidden="true">{category.title.split(' ')[0]}</span>
                <h4 className="font-display font-semibold text-primaryNavy text-sm sm:text-base">
                      {category.title.replace(/^[^\s]+\s/, '')}
                    </h4>
                  </div>
              <p className="text-gray-600 text-xs sm:text-sm font-sans leading-relaxed">
                {category.services.map(s => s.title).join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-xl font-display font-semibold text-primaryNavy">Featured Work</h3>
          <a 
            href="https://heyzine.com/flip-book/2e51bd7d15.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative px-5 py-2.5 text-sm bg-primaryNavy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden w-fit"
          >
            <span className="relative z-10">Explore Full Portfolio</span>
            <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </a>
        </div>

        {/* Portfolio Category Tabs - glass effect, horizontal scroll */}
        <div className="flex flex-nowrap gap-2 mb-6 overflow-x-auto pb-1">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setPortfolioCategory(category.id)}
              className={`px-4 py-2 rounded-xl font-medium text-sm font-sans transition-all duration-300 shrink-0 backdrop-blur-md border border-white/20 ${
                portfolioCategory === category.id
                  ? 'bg-primaryNavy/80 text-white shadow-lg'
                  : 'bg-white/20 text-primaryNavy hover:bg-white/30 hover:border-white/30'
              }`}
            >
              {category.title.replace(/^[^\s]+\s/, '')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {(() => {
            const filteredPortfolio = portfolio.filter(p => p.category === portfolioCategory)
            return filteredPortfolio.length > 0 ? (
              filteredPortfolio.map(p => (
            <PortfolioCard 
              key={p.id} 
              img={p.img}
              title={p.title}
              alt={p.alt}
              caseStudy={p.caseStudy}
            >
              Brief description goes here. Click to view more.
            </PortfolioCard>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500 font-sans">
                No projects in this category yet. Check back soon!
              </div>
            )
          })()}
        </div>
      </section>

      {/* Case Studies - visible on tablet and desktop only. 3 on mobile/desktop, 4 on tablet only */}
      <section id="case-studies" className="hidden md:block py-10">
        <h3 className="text-xl font-display font-semibold text-primaryNavy text-center mb-2">Case Studies</h3>
        <p className="text-gray-500 text-sm font-sans text-center mb-8 max-w-2xl mx-auto">How we helped businesses achieve their goals through <span className="text-primaryNavy font-semibold">strategic design</span></p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {caseStudiesData.map((cs) => (
            <div key={cs.id} className={`rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col ${cs.id === 4 ? 'lg:hidden' : ''}`}>
              <OptimizedImage src={cs.img} alt={`${cs.client} - ${cs.title}`} title={cs.client} className="w-full aspect-video object-cover" objectFit="cover" type="THUMBNAIL" />
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <p className="text-xs font-sans text-primaryNavy/70 mb-1">Case Study {String(cs.id).padStart(2, '0')}</p>
                <h4 className="font-semibold text-primaryNavy font-sans text-sm sm:text-base mb-1">{cs.client}</h4>
                <p className="text-xs font-medium text-accentRed mb-4 flex-grow">{cs.title}</p>
                <button
                  onClick={() => setSelectedCaseStudy(cs)}
                  className="group relative w-full py-2.5 px-4 bg-primaryNavy text-white rounded-xl font-semibold text-sm font-sans shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10">View Full Case Study</span>
                  <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeCaseStudyModal() }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          aria-describedby="case-study-modal-description"
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-sans text-primaryNavy/70 mb-1">Case Study {String(selectedCaseStudy.id).padStart(2, '0')}</p>
                <h2 id="case-study-modal-title" className="text-xl sm:text-2xl font-display font-bold text-primaryNavy">{selectedCaseStudy.client}</h2>
                <p className="text-sm font-medium text-accentRed mt-1">{selectedCaseStudy.title}</p>
              </div>
              <button onClick={closeCaseStudyModal} className="text-gray-400 hover:text-gray-600 transition-colors p-2" aria-label="Close case study">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="mb-6 rounded-xl overflow-hidden">
              <OptimizedImage src={selectedCaseStudy.img} alt={`${selectedCaseStudy.client} - ${selectedCaseStudy.title}`} className="w-full" objectFit="fitWidth" type="GALLERY" />
            </div>
            <div id="case-study-modal-description" className="space-y-6">
              <section>
                <h3 className="font-semibold text-primaryNavy mb-2">Overview</h3>
                <p className="text-gray-600 font-sans leading-relaxed">{selectedCaseStudy.overview}</p>
              </section>
              <section className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <h3 className="font-semibold text-accentRed mb-2">Challenge</h3>
                <ul className="text-red-700 font-sans space-y-1 list-disc list-inside">
                  {selectedCaseStudy.challenge.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </section>
              <section className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <h3 className="font-semibold text-primaryNavy mb-2">Solution</h3>
                <p className="text-blue-700 font-sans leading-relaxed">{selectedCaseStudy.solution}</p>
              </section>
              <section>
                <h3 className="font-semibold text-primaryNavy mb-2">My Role</h3>
                <ul className="text-gray-600 font-sans space-y-1">
                  {selectedCaseStudy.role.map((r, i) => <li key={i} className="flex items-center gap-2"><span className="text-primaryNavy">•</span> {r}</li>)}
                </ul>
              </section>
              <section className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gold mb-2">Outcome</h3>
                <p className="text-green-700 font-sans leading-relaxed">{selectedCaseStudy.outcome}</p>
              </section>
            </div>
            <button onClick={closeCaseStudyModal} className="group relative w-full mt-6 py-3 bg-primaryNavy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <span className="relative z-10">Close</span>
              <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      )}

      {/* Blog - visible on tablet and desktop only */}
      <section id="blog" className="hidden md:block py-10">
        <h3 className="text-xl font-display font-semibold text-primaryNavy text-center mb-2">Blog</h3>
        <p className="text-gray-500 text-sm font-sans text-center mb-8 max-w-2xl mx-auto">Insights on <span className="text-primaryNavy font-semibold">design</span>, <span className="text-accentRed font-semibold">branding</span>, and industry trends</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {blogData.map((post) => (
            <article key={post.id} className="group rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition-all duration-300 flex flex-col">
              <OptimizedImage src={post.img} alt={post.title} title={post.title} className="w-full aspect-video object-cover" objectFit="cover" type="THUMBNAIL" />
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="font-semibold text-primaryNavy font-sans text-sm group-hover:text-accentRed transition-colors">{post.title}</h4>
                <p className="text-gray-600 text-xs mt-1 font-sans flex-grow">{post.shortDesc}</p>
                <button
                  onClick={() => setSelectedBlog(post)}
                  className="group relative mt-3 w-full py-2 px-4 bg-primaryNavy text-white rounded-xl font-semibold text-sm font-sans shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10">Read more</span>
                  <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Blog Modal */}
      {selectedBlog && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeBlogModal() }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          aria-describedby="blog-modal-description"
        >
          <div 
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 id="blog-modal-title" className="text-xl sm:text-2xl font-display font-bold text-primaryNavy pr-8">{selectedBlog.title}</h2>
              <button onClick={closeBlogModal} className="text-gray-400 hover:text-gray-600 transition-colors p-2 shrink-0" aria-label="Close blog">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="mb-6 rounded-xl overflow-hidden ring-1 ring-gray-100">
              <OptimizedImage src={selectedBlog.img} alt={selectedBlog.title} className="w-full" objectFit="fitWidth" type="GALLERY" />
            </div>
            <div id="blog-modal-description" className="blog-reader text-gray-700 font-sans leading-[1.8] space-y-5 text-base sm:text-[17px]">
              {selectedBlog.description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={async () => {
                  const url = `${window.location.origin}${window.location.pathname}#blog-${selectedBlog.slug || selectedBlog.id}`
                  try {
                    await navigator.clipboard.writeText(url)
                    setCopyLinkFeedback(true)
                    setTimeout(() => setCopyLinkFeedback(false), 2000)
                    const liveRegion = document.getElementById('aria-live-region')
                    if (liveRegion) liveRegion.textContent = 'Link copied to clipboard'
                  } catch {
                    const liveRegion = document.getElementById('aria-live-region')
                    if (liveRegion) liveRegion.textContent = 'Failed to copy link'
                  }
                }}
                className="group relative flex-1 py-3 px-4 border-2 border-primaryNavy text-primaryNavy rounded-xl font-semibold hover:border-accentRed hover:text-white transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 disabled:opacity-70"
                disabled={copyLinkFeedback}
              >
                {copyLinkFeedback ? (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Copied!
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    Copy link
                  </span>
                )}
                <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button
                onClick={async () => {
                  const url = `${window.location.origin}${window.location.pathname}#blog-${selectedBlog.slug || selectedBlog.id}`
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: `${selectedBlog.title} | Connect Digitals Blog`,
                        text: selectedBlog.shortDesc,
                        url
                      })
                    } catch (err) {
                      if (err.name !== 'AbortError') {
                        try {
                          await navigator.clipboard.writeText(url)
                          setCopyLinkFeedback(true)
                          setTimeout(() => setCopyLinkFeedback(false), 2000)
                        } catch {}
                      }
                    }
                  } else {
                    try {
                      await navigator.clipboard.writeText(url)
                      setCopyLinkFeedback(true)
                      setTimeout(() => setCopyLinkFeedback(false), 2000)
                    } catch {}
                  }
                }}
                className="group relative flex-1 py-3 px-4 bg-primaryNavy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  Share
                </span>
                <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button onClick={closeBlogModal} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="testimonials" className="py-10">
        <h3 className="text-xl font-display font-semibold mb-2 text-primaryNavy text-center">What clients say</h3>
          <p className="text-gray-500 text-sm font-sans text-center mb-8 max-w-2xl mx-auto">Trusted by businesses across <span className="text-accentRed font-semibold">Ethiopia</span> and beyond</p>
        
        {/* Horizontal Scrolling Testimonials */}
        <div className="relative overflow-hidden py-4">
          {/* Gradient fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
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

      <section id="faq" className="py-6 sm:py-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primaryNavy rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-bold text-primaryNavy">FAQ</h3>
        </div>
        <div className="max-w-2xl mx-auto">
          <motion.div
            key={faqSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5"
          >
            <h4 className="font-semibold text-primaryNavy font-sans text-sm sm:text-base mb-2">{faqItems[faqSlide].q}</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">{faqItems[faqSlide].a}</p>
          </motion.div>
          <div className="flex justify-center gap-2 mt-4">
            {faqItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setFaqSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  faqSlide === index ? 'w-6 bg-primaryNavy' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to FAQ ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-primaryNavy text-center mb-2">Get in Touch</h2>
          <p className="text-gray-500 text-sm font-sans text-center mb-10">Ready to <span className="text-gold font-semibold">transform</span> your vision? We'd love to hear from you.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className="space-y-6 min-w-0">
              <a href="tel:+251923988838" className="group flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:border-primaryNavy/30 hover:shadow-md transition-all duration-300 min-w-0">
                <span className="w-12 h-12 rounded-xl bg-primaryNavy flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                </span>
                <div>
                  <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="font-semibold text-primaryNavy font-sans">+251 923 988 838</p>
                </div>
              </a>
              <a href="https://wa.me/251923988838" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:border-[#25D366]/40 hover:shadow-md transition-all duration-300 min-w-0">
                <span className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </span>
                <div>
                  <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-0.5">WhatsApp</p>
                  <p className="font-semibold text-primaryNavy font-sans">Chat with us</p>
                </div>
              </a>
              <a href="mailto:digitalsconnect@gmail.com" className="group flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:border-accentRed/30 hover:shadow-md transition-all duration-300 min-w-0">
                <span className="w-12 h-12 rounded-xl bg-accentRed flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-0.5">Email</p>
                  <p className="font-semibold text-primaryNavy font-sans break-all">digitalsconnect@gmail.com</p>
                </div>
              </a>
              <a href="https://linktr.ee/Connectdigitals" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:border-primaryNavy/30 hover:shadow-md transition-all duration-300 min-w-0">
                <span className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </span>
                <div>
                  <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-0.5">Linktree</p>
                  <p className="font-semibold text-primaryNavy font-sans">Instagram · Facebook · TikTok</p>
                </div>
              </a>
            </div>
            <form onSubmit={handleContactSubmit} action="https://formspree.io/f/mgvzpqpq" method="POST" className="hidden md:flex flex-col lg:h-full p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm min-h-0">
              <input type="hidden" name="subject" value="Contact form submission" />
              <input name="name" required placeholder="Your name" className="w-full px-4 py-3 text-sm font-sans border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryNavy focus:border-transparent outline-none transition-shadow mb-4" />
              <input type="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email" placeholder="Email address" className="w-full px-4 py-3 text-sm font-sans border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryNavy focus:border-transparent outline-none transition-shadow mb-4" />
              <textarea name="message" required minLength={20} title="Please provide at least 20 characters" placeholder="Tell us about your project..." className="flex-1 min-h-[120px] w-full px-4 py-3 text-sm font-sans border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryNavy focus:border-transparent resize-none outline-none transition-shadow mb-4" />
              <button type="submit" disabled={isSubmitting} className="group relative w-full py-3.5 bg-primaryNavy text-white rounded-xl font-semibold text-sm font-sans shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shrink-0">
                <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </form>
          </div>
        </div>
      </section>
                
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeSuccessModal() }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
            <h3 id="success-modal-title" className="font-display font-semibold text-primaryNavy mb-2">Message Sent!</h3>
            <p className="text-gray-600 text-sm mb-4 font-sans">We'll get back to you within 24 hours.</p>
            <button onClick={closeSuccessModal} className="group relative w-full py-2.5 bg-primaryNavy text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <span className="relative z-10">Close</span>
              <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
