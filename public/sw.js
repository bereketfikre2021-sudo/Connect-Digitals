// Service Worker for Connect Digitals
const CACHE_NAME = 'connect-digitals-v1'
const STATIC_CACHE = 'static-v1'
const IMAGE_CACHE = 'images-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/img/Connect.webp',
  '/img/BG.webp',
  '/img/BG-2.webp',
  '/img/BG-3.webp',
  '/img/BG-4.webp',
  '/img/BG-5.webp'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== STATIC_CACHE && 
                     cacheName !== IMAGE_CACHE &&
                     cacheName !== CACHE_NAME
            })
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/img/')) {
    // Images: Cache First strategy
    event.respondWith(handleImageRequest(request))
  } else if (url.pathname.startsWith('/api/') || url.hostname.includes('formspree')) {
    // API requests: Network First strategy
    event.respondWith(handleApiRequest(request))
  } else {
    // Static assets: Cache First strategy
    event.respondWith(handleStaticRequest(request))
  }
})

// Cache First strategy for images
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('Image fetch failed:', error)
    return new Response('Image not available', { status: 404 })
  }
}

// Network First strategy for API requests
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    throw error
  }
}

// Cache First strategy for static assets
async function handleStaticRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('Static asset fetch failed:', error)
    return new Response('Asset not available', { status: 404 })
  }
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'form-submission') {
    event.waitUntil(handleFormSubmission())
  }
})

async function handleFormSubmission() {
  // Handle offline form submissions
  console.log('Handling background form submission')
}
