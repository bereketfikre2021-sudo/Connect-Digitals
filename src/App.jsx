import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import QuoteModal from './components/QuoteModal'
import PricingModal from './components/PricingModal'
import LegalModal from './components/LegalModal'
import PerformanceMonitor from './components/PerformanceMonitor'
import { verifyImages } from './utils/imageVerification'

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false)
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: null })

  // Legal content
  const legalContent = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <div>
          <section className="mb-8">
            <div className="bg-cream border-l-4 border-primaryNavy p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primaryNavy rounded-full flex items-center justify-center text-white text-sm">1</span>
                Information We Collect
              </h3>
              <p className="text-neutralDark mb-4 font-sans leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                make a purchase, or contact us for support. This may include your name, email address, 
                phone number, and any other information you choose to provide.
              </p>
              <ul className="list-disc list-inside text-neutralDark font-sans ml-4 space-y-2">
                <li>Personal identification information (name, email, phone number)</li>
                <li>Business information (company name, industry, project details)</li>
                <li>Communication records (emails, messages, feedback)</li>
                <li>Payment information (processed securely through third-party providers)</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-accentRed p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-accentRed rounded-full flex items-center justify-center text-white text-sm">2</span>
                How We Use Your Information
              </h3>
              <p className="text-neutralDark mb-4 font-sans leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, 
                process transactions, send you technical notices and support messages, and communicate 
                with you about products, services, and promotional offers.
              </p>
              <ul className="list-disc list-inside text-neutralDark font-sans ml-4 space-y-2">
                <li>To provide and maintain our design services</li>
                <li>To process payments and manage billing</li>
                <li>To communicate about projects and updates</li>
                <li>To improve our services and user experience</li>
                <li>To send marketing communications (with your consent)</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-gold p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm">3</span>
                Information Sharing
              </h3>
              <p className="text-neutralDark mb-4 font-sans leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this privacy policy or as required by law.
              </p>
              <div className="bg-white p-4 rounded-lg border border-gold">
                <p className="text-neutralDark font-sans text-sm">
                  <strong className="text-primaryNavy">We may share information with:</strong><br/>
                  • Service providers who assist in our operations<br/>
                  • Legal authorities when required by law<br/>
                  • Business partners with your explicit consent
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-primaryNavy p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primaryNavy rounded-full flex items-center justify-center text-white text-sm">4</span>
                Data Security
              </h3>
              <p className="text-neutralDark mb-4 font-sans leading-relaxed">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="bg-white p-4 rounded-lg border border-primaryNavy">
                <p className="text-neutralDark font-sans text-sm">
                  <strong className="text-primaryNavy">Security measures include:</strong><br/>
                  • SSL encryption for data transmission<br/>
                  • Secure servers and databases<br/>
                  • Regular security audits and updates<br/>
                  • Limited access to personal information
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-accentRed p-6 rounded-r-lg">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-accentRed rounded-full flex items-center justify-center text-white text-sm">5</span>
                Contact Us
              </h3>
              <p className="text-neutralDark mb-4 font-sans leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-white p-6 rounded-lg border border-accentRed shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    },
    cookie: {
      title: "Cookie Policy",
      content: (
        <div>
          <section className="mb-8">
            <div className="bg-cream border-l-4 border-primaryNavy p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primaryNavy rounded-full flex items-center justify-center text-white text-sm">1</span>
                What Are Cookies
              </h3>
              <p className="text-neutralDark mb-4 font-sans leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you 
                visit our website. They help us provide you with a better experience by remembering your 
                preferences and understanding how you use our site.
              </p>
              <div className="bg-white p-4 rounded-lg border border-primaryNavy">
                <p className="text-neutralDark font-sans text-sm">
                  <strong className="text-primaryNavy">Cookies help us:</strong><br/>
                  • Remember your preferences and settings<br/>
                  • Understand how you use our website<br/>
                  • Improve our services and user experience<br/>
                  • Provide personalized content and features
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-accentRed p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-accentRed rounded-full flex items-center justify-center text-white text-sm">2</span>
                Types of Cookies We Use
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg border border-accentRed">
                  <h4 className="text-xl font-display font-semibold text-primaryNavy mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-accentRed rounded-full flex items-center justify-center text-white text-xs">A</span>
                    Essential Cookies
                  </h4>
                  <p className="text-neutralDark mb-3 font-sans">
                    These cookies are necessary for the website to function properly. They enable basic 
                    functions like page navigation and access to secure areas of the website.
                  </p>
                  <div className="bg-cream p-3 rounded border-l-2 border-accentRed">
                    <p className="text-neutralDark font-sans text-sm">
                      <strong>Examples:</strong> Session management, security, form submissions
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-accentRed">
                  <h4 className="text-xl font-display font-semibold text-primaryNavy mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-accentRed rounded-full flex items-center justify-center text-white text-xs">B</span>
                    Analytics Cookies
                  </h4>
                  <p className="text-neutralDark mb-3 font-sans">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously.
                  </p>
                  <div className="bg-cream p-3 rounded border-l-2 border-accentRed">
                    <p className="text-neutralDark font-sans text-sm">
                      <strong>Examples:</strong> Google Analytics, page views, user behavior tracking
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-accentRed">
                  <h4 className="text-xl font-display font-semibold text-primaryNavy mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-accentRed rounded-full flex items-center justify-center text-white text-xs">C</span>
                    Preference Cookies
                  </h4>
                  <p className="text-neutralDark mb-3 font-sans">
                    These cookies remember your choices and preferences to provide you with a more 
                    personalized experience.
                  </p>
                  <div className="bg-cream p-3 rounded border-l-2 border-accentRed">
                    <p className="text-neutralDark font-sans text-sm">
                      <strong>Examples:</strong> Language settings, theme preferences, user customizations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-gold p-6 rounded-r-lg mb-6">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm">3</span>
                Managing Cookies
              </h3>
              <p className="text-neutralDark mb-4 font-sans leading-relaxed">
                You can control and manage cookies through your browser settings. Most browsers allow 
                you to refuse cookies or delete them. However, disabling cookies may affect the 
                functionality of our website.
              </p>
              <div className="bg-white p-4 rounded-lg border border-gold">
                <p className="text-neutralDark font-sans text-sm">
                  <strong className="text-primaryNavy">Browser Settings:</strong><br/>
                  • Chrome: Settings → Privacy and Security → Cookies<br/>
                  • Firefox: Options → Privacy & Security → Cookies<br/>
                  • Safari: Preferences → Privacy → Cookies<br/>
                  • Edge: Settings → Cookies and Site Permissions
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-cream border-l-4 border-primaryNavy p-6 rounded-r-lg">
              <h3 className="text-2xl font-display font-semibold text-primaryNavy mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primaryNavy rounded-full flex items-center justify-center text-white text-sm">4</span>
                Contact Us
              </h3>
              <p className="text-neutralDark mb-4 font-sans leading-relaxed">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <div className="bg-white p-6 rounded-lg border border-primaryNavy shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>
            </div>
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
                Connect Digitals provides comprehensive creative design services including but not limited to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Creative Design Services</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Graphic Design & Layout</li>
                    <li>• Branding & Visual Identity Design</li>
                    <li>• Packaging & Labeling Design</li>
                    <li>• Digital Media Design</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Digital & Web Services</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Web Design & Development</li>
                    <li>• UI/UX Design & Prototyping</li>
                    <li>• Advertising & Marketing Design</li>
                    <li>• Social Media Marketing Design</li>
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
                    <li>• Additional revisions: $50 per round</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-accentRed">
                  <h4 className="font-semibold text-primaryNavy mb-2">Project Timeline</h4>
                  <ul className="text-neutralDark font-sans text-sm space-y-1">
                    <li>• Beginner Package: 5-7 business days</li>
                    <li>• Professional Package: 10-14 business days</li>
                    <li>• Premium Package: 15-21 business days</li>
                    <li>• Rush orders: 50% additional fee</li>
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
    <div className="min-h-screen bg-cream">
      <PerformanceMonitor />
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      <main>
        <Home
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onOpenPricingModal={() => setIsPricingModalOpen(true)}
        />
      </main>
      <Footer 
        key={`footer-${Date.now()}`} 
        onOpenLegalModal={(type) => setLegalModal({ isOpen: true, type })}
      />
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
    </div>
  )
}
