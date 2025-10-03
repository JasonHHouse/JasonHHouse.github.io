import fs from 'fs'
import path from 'path'

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: string
  priority: string
}

export function generateSitemap(): string {
  const baseUrl = 'https://jasonhhouse.github.io'
  const urls: SitemapUrl[] = []

  // Static pages
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/posts/', priority: '0.8', changefreq: 'weekly' },
    { path: '/about/', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact/', priority: '0.6', changefreq: 'monthly' },
    { path: '/cyoa/', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy/', priority: '0.5', changefreq: 'yearly' }
  ]

  // Add static pages
  staticPages.forEach(page => {
    const today = new Date().toISOString().split('T')[0] || new Date().toISOString().substring(0, 10)
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority
    })
  })

  // Get blog posts dynamically
  const postsDirectory = path.join(process.cwd(), 'pages/posts')
  
  try {
    const postFiles = fs.readdirSync(postsDirectory)
      .filter(file => file.endsWith('.tsx') && !file.startsWith('index'))
    
    postFiles.forEach(file => {
      const postSlug = file.replace('.tsx', '')
      const filePath = path.join(postsDirectory, file)
      const stats = fs.statSync(filePath)
      
      // Extract date from filename if available
      const dateMatch = postSlug.match(/^(\d{4}-\d{2}-\d{2})/)
      const lastmod = dateMatch?.[1] ?? (stats.mtime.toISOString().split('T')[0] || stats.mtime.toISOString().substring(0, 10))
      
      urls.push({
        loc: `${baseUrl}/posts/${postSlug}/`,
        lastmod,
        changefreq: 'monthly',
        priority: '0.9'
      })
    })
  } catch (error) {
    console.error('Error reading posts directory:', error)
  }

  // Generate XML
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`
}