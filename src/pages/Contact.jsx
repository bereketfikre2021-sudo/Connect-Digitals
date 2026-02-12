import React from 'react'

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full overflow-x-hidden">
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
              <div className="space-y-4">
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
                <a 
                  href="https://wa.me/251923988838" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-green-500 hover:bg-green-50/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 font-sans">WhatsApp</h3>
                    <p className="text-gray-600 font-sans group-hover:text-green-700">Chat with us</p>
                  </div>
                </a>
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
              <div className="flex flex-wrap gap-3">
                <a 
                  href="tel:+251923988838" 
                  className="flex-1 min-w-[120px] px-4 py-3 bg-primaryNavy text-white rounded-xl font-medium text-center hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Call Now
                </a>
                <a 
                  href="https://wa.me/251923988838" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] px-4 py-3 bg-[#25D366] text-white rounded-xl font-medium text-center hover:bg-[#20bd5a] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  WhatsApp
                </a>
                <a 
                  href="mailto:digitalsconnect@gmail.com" 
                  className="flex-1 min-w-[120px] px-4 py-3 bg-accentRed text-white rounded-xl font-medium text-center hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
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
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address"
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
                  minLength={20}
                  title="Please provide at least 20 characters"
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
