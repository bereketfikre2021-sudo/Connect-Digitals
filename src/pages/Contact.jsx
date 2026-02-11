import React from 'react'

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 w-full overflow-x-hidden">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-primaryNavy mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
          Ready to transform your vision into reality? Get in touch and let's discuss how we can bring your ideas to life.
        </p>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-display font-semibold text-primaryNavy mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8 leading-relaxed font-sans">
                Whether you have a specific project in mind or just want to explore possibilities, 
                we're here to help you achieve your goals.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-primaryNavy rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 font-sans">Phone</h3>
                  <p className="text-gray-600 font-sans">+251 923 988 838</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-accentRed rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 font-sans">Email</h3>
                  <p className="text-gray-600 font-sans">digitalsconnect@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 font-sans">Social</h3>
                  <p className="text-gray-600 font-sans">Connect with us</p>
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
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-display font-semibold text-primaryNavy mb-6">Send us a Message</h3>
            <form 
              className="space-y-6" 
              action="https://formspree.io/f/mgvzpqpq" 
              method="POST"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="group relative w-full px-8 py-4 bg-primaryNavy text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                aria-label="Submit contact form message"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-accentRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
