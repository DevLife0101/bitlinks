export default function sitemap() {
  const baseUrl = 'https://bitlinks-blond.vercel.app';

  // Return an array of all the public pages you want Google to rank
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, // The homepage is the most important
    },
    {
      url: `${baseUrl}/shorten`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Very important to rank for "URL shortener"
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}