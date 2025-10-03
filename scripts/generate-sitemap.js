import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function generateSitemap() {
  const baseUrl = 'https://jasonhhouse.github.io'
  const urls = []

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
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page.changefreq,
      priority: page.priority
    })
  })

  // Get blog posts dynamically
  const postsDirectory = path.join(path.dirname(__dirname), 'pages/posts')
  
  try {
    const postFiles = fs.readdirSync(postsDirectory)
      .filter(file => file.endsWith('.tsx') && !file.startsWith('index'))
    
    postFiles.forEach(file => {
      const postSlug = file.replace('.tsx', '')
      const filePath = path.join(postsDirectory, file)
      const stats = fs.statSync(filePath)
      
      // Extract date from filename if available
      const dateMatch = postSlug.match(/^(\d{4}-\d{2}-\d{2})/)
      const lastmod = dateMatch ? dateMatch[1] : stats.mtime.toISOString().split('T')[0]
      
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
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
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

  // Write to public directory
  const projectRoot = path.dirname(__dirname)
  const publicSitemapPath = path.join(projectRoot, 'public/sitemap.xml')
  fs.writeFileSync(publicSitemapPath, sitemap)
  console.log('Sitemap generated successfully at public/sitemap.xml')
  
  // Also write to out directory for static builds
  const outDir = path.join(projectRoot, 'out')
  if (fs.existsSync(outDir)) {
    const outSitemapPath = path.join(outDir, 'sitemap.xml')
    fs.writeFileSync(outSitemapPath, sitemap)
    console.log('Sitemap copied to out/sitemap.xml')
  }
}

// Run the function
generateSitemap()