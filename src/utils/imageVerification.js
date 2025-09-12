// Image verification utility for deployment
export const verifyImages = async () => {
  const imagePaths = [
    '/img/Connect.webp',
    '/img/BG.webp',
    '/img/BG-2.webp',
    '/img/BG-3.webp',
    '/img/BG-4.webp',
    '/img/BG-5.webp',
    '/img/Gedy.webp',
    '/img/Dag.webp',
    '/img/Abenezer.webp',
    '/img/Kass.webp',
    '/img/Miko.webp',
    '/img/Hayle.webp',
    '/img/Zewd.webp',
    '/img/swan-clothing.webp',
    '/img/Finix.webp',
    '/img/Lensa Fashion Design & Makeup.webp',
    '/img/Company profile.webp',
    '/img/Maleda Coffee.webp'
  ]

  const results = []
  
  for (const path of imagePaths) {
    try {
      const response = await fetch(path, { method: 'HEAD' })
      results.push({
        path,
        status: response.status,
        accessible: response.ok
      })
    } catch (error) {
      results.push({
        path,
        status: 'error',
        accessible: false,
        error: error.message
      })
    }
  }
  
  return results
}

// Log image verification results in development
if (import.meta.env.DEV) {
  verifyImages().then(results => {
    const failed = results.filter(r => !r.accessible)
    if (failed.length > 0) {
      console.warn('Some images failed to load:', failed)
    } else {
      console.log('All images verified successfully!')
    }
  })
}
