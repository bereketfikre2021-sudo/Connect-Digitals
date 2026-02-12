import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import PerformanceMonitor from './components/PerformanceMonitor'
import FloatingNavigation from './components/FloatingNavigation'
import { verifyImages } from './utils/imageVerification'

// Lazy load non-critical components
const QuoteModal = lazy(() => import('./components/QuoteModal'))
const PricingModal = lazy(() => import('./components/PricingModal'))
const LegalModal = lazy(() => import('./components/LegalModal'))

function useHashScroll() {
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [location.pathname, location.hash])
}

export default function App() {
  useHashScroll()
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false)
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: null })

  // Legal content - minimal
  const contactBlock = (
    <div className="flex flex-col gap-2 mt-2">
      <a href="mailto:digitalsconnect@gmail.com" className="text-accentRed font-medium break-all hover:underline">
        digitalsconnect@gmail.com
      </a>
      <a href="tel:+251923988838" className="text-accentRed font-medium shrink-0">+251 923 988 838</a>
    </div>
  )

  const legalContent = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-4">
          <section>
            <h3 className="font-semibold text-primaryNavy mb-1">1. Information We Collect</h3>
            <p className="leading-relaxed text-sm">
              We collect information you provide directly: name, email, phone number, business info, and payment details (processed securely).
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-primaryNavy mb-1">2. How We Use Your Information</h3>
            <p className="leading-relaxed text-sm">
              We use it to provide services, process payments, communicate about projects, and improve our services.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-primaryNavy mb-1">3. Information Sharing</h3>
            <p className="leading-relaxed text-sm">
              We do not sell your data. We may share with service providers, legal authorities when required, or partners with your consent.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-primaryNavy mb-1">4. Data Security</h3>
            <p className="leading-relaxed text-sm">
              We use SSL encryption, secure servers, and limit access to protect your information.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-primaryNavy mb-1">5. Contact Us</h3>
            <p className="leading-relaxed text-sm mb-1">Questions? Contact us:</p>
            {contactBlock}
          </section>
        </div>
      )
    },
    cookie: {
      title: "Cookie Policy",
      content: (
        <div className="space-y-4">
          <section>
            <h3 className="font-semibold text-primaryNavy mb-1">1. What Are Cookies</h3>
            <p className="leading-relaxed text-sm">
              Small text files placed on your device when you visit. They help remember preferences and improve your experience.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-primaryNavy mb-1">2. Types We Use</h3>
            <p className="leading-relaxed text-sm">
              <strong>Essential:</strong> Required for the site to work. <strong>Analytics:</strong> Help us understand usage. <strong>Preference:</strong> Remember your choices.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-primaryNavy mb-1">3. Managing Cookies</h3>
            <p className="leading-relaxed text-sm">
              Control cookies via your browser settings (Chrome, Firefox, Safari, Edge). Disabling may affect site functionality.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-primaryNavy mb-1">4. Contact Us</h3>
            <p className="leading-relaxed text-sm mb-1">Questions about cookies?</p>
            {contactBlock}
          </section>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      content: (
        <div>
          <section className="mb-8">
            <div className="bg-cream border-l-4 border-primaryNavy p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primaryNavy rounded-full flex items-center justify-center text-white text-sm">1</span>
                Acceptance of Terms
              </h3>
              <p className="text-neutralDark mb-4 font-sans leading-relaxed">
                By accessing and using Connect Digitals services, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
              <div className="bg-white p-4 rounded-lg border border-primaryNavy">
                <p className="text-neutralDark font-sans text-sm">
                  <strong className="text-primaryNavy">By using our services, you agree to:</strong><br/>
                  • Comply with all applicable laws and regulations<br/>
                  • Provide accurate and complete information<br/>
                  • Respect intellectual property rights<br/>
                  • Maintain confidentiality of sensitive information
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-accentRed p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-accentRed rounded-full flex items-center justify-center text-white text-sm">2</span>
                Services Description
              </h3>
              <p className="text-neutralDark mb-4 font-sans leading-relaxed">
                Connect Digitals provides creative design services. All prices in ETB (Ethiopian Birr).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Brand Design</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Logo Design</li>
                    <li>• Visual Identity</li>
                    <li>• Brand Guidelines</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Graphic Design</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Marketing & Advertising Graphics</li>
                    <li>• Digital Media Design</li>
                    <li>• Layout & Print Design</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Web & UI Design</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Website Design & Development</li>
                    <li>• UI/UX Design</li>
                    <li>• Wireframes & Prototypes</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Social Media Design</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Social Media Creatives</li>
                    <li>• Ad Design</li>
                    <li>• Campaign Visuals</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Packaging and Environmental Design</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Packaging Design</li>
                    <li>• Label Design</li>
                    <li>• Signage</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-gold p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm">3</span>
                Payment Terms & Pricing
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gold">
                  <h4 className="font-semibold text-primaryNavy mb-2">Payment Structure</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• 50% deposit required before project commencement</li>
                    <li>• 50% final payment upon project completion and approval</li>
                    <li>• Payment due within 7 days of invoice receipt</li>
                    <li>• Late payments may incur 2% monthly interest</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gold">
                  <h4 className="font-semibold text-primaryNavy mb-2">Accepted Payment Methods</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Bank transfer</li>
                    <li>• Mobile money (Ethiopia)</li>
                    <li>• PayPal (international clients)</li>
                    <li>• Cryptocurrency (Bitcoin, Ethereum)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-primaryNavy p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primaryNavy rounded-full flex items-center justify-center text-white text-sm">4</span>
                Intellectual Property Rights
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-primaryNavy">
                  <h4 className="font-semibold text-primaryNavy mb-2">Client Ownership</h4>
                  <p className="text-neutralDark font-sans text-sm">
                    Upon full payment, the client receives exclusive rights to the final design work. 
                    This includes all source files, variations, and derivative works created for the project.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-primaryNavy">
                  <h4 className="font-semibold text-primaryNavy mb-2">Agency Rights</h4>
                  <p className="text-neutralDark font-sans text-sm">
                    Connect Digitals retains the right to use completed work for portfolio, marketing, 
                    and promotional purposes unless otherwise agreed upon in writing. We may also use 
                    project details for case studies and testimonials.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-primaryNavy">
                  <h4 className="font-semibold text-primaryNavy mb-2">Third-Party Assets</h4>
                  <p className="text-neutralDark font-sans text-sm">
                    Any third-party assets (fonts, images, icons) used in projects remain subject to 
                    their original licensing terms. Client is responsible for obtaining proper licenses 
                    for continued use.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-accentRed p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-accentRed rounded-full flex items-center justify-center text-white text-sm">5</span>
                Project Process & Revisions
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Revision Policy</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Beginner Package: 2 rounds of revisions included</li>
                    <li>• Professional Package: 5 rounds of revisions included</li>
                    <li>• Premium Package: Unlimited revisions included</li>
                    <li>• Additional revisions: 1,500 ETB per round</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Project Timeline</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Beginner Package: 5-7 business days</li>
                    <li>• Professional Package: 10-14 business days</li>
                    <li>• Premium Package: 15-21 business days</li>
                    <li>• Rush orders: 50% additional fee (ETB)</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Client Responsibilities</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Provide clear project brief and requirements</li>
                    <li>• Respond to feedback requests within 48 hours</li>
                    <li>• Provide all necessary content and assets</li>
                    <li>• Make timely payments as agreed</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-gold p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm">6</span>
                Cancellation & Refund Policy
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gold">
                  <h4 className="font-semibold text-primaryNavy mb-2">Project Cancellation</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Cancellation before work begins: 100% refund</li>
                    <li>• Cancellation after 25% completion: 75% refund</li>
                    <li>• Cancellation after 50% completion: 50% refund</li>
                    <li>• Cancellation after 75% completion: 25% refund</li>
                    <li>• No refund after 90% completion</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gold">
                  <h4 className="font-semibold text-primaryNavy mb-2">Refund Processing</h4>
                  <p className="text-neutralDark font-sans text-sm">
                    Refunds will be processed within 7-14 business days using the original payment method. 
                    Processing fees may apply and will be deducted from the refund amount.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-primaryNavy p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primaryNavy rounded-full flex items-center justify-center text-white text-sm">7</span>
                Confidentiality & Non-Disclosure
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-primaryNavy">
                  <h4 className="font-semibold text-primaryNavy mb-2">Confidential Information</h4>
                  <p className="text-neutralDark font-sans text-sm">
                    Both parties agree to maintain strict confidentiality regarding all project details, 
                    business strategies, proprietary information, and any sensitive data shared during 
                    the course of the project.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-primaryNavy">
                  <h4 className="font-semibold text-primaryNavy mb-2">Non-Disclosure Agreement</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Information remains confidential for 3 years after project completion</li>
                    <li>• No sharing of client information with competitors</li>
                    <li>• Secure storage and handling of all project files</li>
                    <li>• Immediate notification of any security breaches</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-accentRed p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-accentRed rounded-full flex items-center justify-center text-white text-sm">8</span>
                Limitation of Liability
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Service Limitations</h4>
                  <p className="text-neutralDark font-sans text-sm">
                    Connect Digitals shall not be liable for any indirect, incidental, special, 
                    consequential, or punitive damages, including without limitation, loss of profits, 
                    data, use, goodwill, or other intangible losses resulting from the use of our services.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Maximum Liability</h4>
                  <p className="text-neutralDark font-sans text-sm">
                    Our total liability for any claims arising from our services shall not exceed 
                    the total amount paid by the client for the specific project in question.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-gold p-6 rounded-r-lg">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm">9</span>
                Contact Information & Disputes
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg border border-gold shadow-sm">
                  <h4 className="font-semibold text-primaryNavy mb-4">Get in Touch</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accentRed/10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-accentRed" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-neutralDark font-sans">Email</p>
                        <p className="text-neutralDark font-sans font-medium">digitalsconnect@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-neutralDark font-sans">Phone</p>
                        <p className="text-neutralDark font-sans font-medium">+251 923 988 838</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primaryNavy/10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-primaryNavy" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-neutralDark font-sans">Location</p>
                        <p className="text-neutralDark font-sans font-medium">Ethiopia</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gold">
                  <h4 className="font-semibold text-primaryNavy mb-2">Dispute Resolution</h4>
                  <p className="text-neutralDark font-sans text-sm">
                    Any disputes arising from these terms shall be resolved through good faith negotiations. 
                    If negotiations fail, disputes will be subject to the jurisdiction of Ethiopian courts. 
                    We encourage open communication to resolve any issues amicably.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }
  }

  // Verify images on app load
  useEffect(() => {
    if (import.meta.env.PROD) {
      verifyImages().then(results => {
        const failed = results.filter(r => !r.accessible)
        if (failed.length > 0) {
          console.warn('Some images failed to load after deployment:', failed)
        } else {
          console.log('All images loaded successfully after deployment!')
        }
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden w-full">
      <PerformanceMonitor />
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      <main role="main" aria-label="Main content">
        <Routes>
          <Route path="/" element={<Home onOpenQuoteModal={() => setIsQuoteModalOpen(true)} onOpenPricingModal={() => setIsPricingModalOpen(true)} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer 
        onOpenLegalModal={(type) => setLegalModal({ isOpen: true, type })}
      />
      {/* Modals - Lazy loaded with Suspense */}
      <Suspense fallback={null}>
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
        />
        <PricingModal
          isOpen={isPricingModalOpen}
          onClose={() => setIsPricingModalOpen(false)}
        />
        <LegalModal
          isOpen={legalModal.isOpen}
          onClose={() => setLegalModal({ isOpen: false, type: null })}
          type={legalModal.type}
          title={legalModal.type ? legalContent[legalModal.type].title : ''}
          content={legalModal.type ? legalContent[legalModal.type].content : null}
        />
      </Suspense>
      {/* ARIA Live Region for screen reader announcements */}
      <div 
        id="aria-live-region" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />
      <FloatingNavigation />
      <CookieBanner onOpenCookiePolicy={() => setLegalModal({ isOpen: true, type: 'cookie' })} />
    </div>
  )
}
