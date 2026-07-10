export default function robots() {
  return {
    rules: {
      userAgent: '*',
      // ONLY allow Google to read your main marketing pages
      allow: ['/', '/about', '/contact', '/login', '/signup'],
      // Block Google from reading your backend APIs and private dashboards
      disallow: ['/api/', '/dashboard/', '/profile/'],
    },
    // Update this to your actual production domain once you deploy
    sitemap: 'https://bitlinks-blond.vercel.app/sitemap.xml',
  }
}