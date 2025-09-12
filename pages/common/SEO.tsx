import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  readingTime?: string;
  canonical?: string;
  noindex?: boolean;
}

export default function SEO({
  title = 'Leadership and Mentorship - Jason House\'s Blog',
  description = 'Leadership insights and mentorship guidance from Jason House. Explore leadership techniques, team management, and professional growth.',
  keywords = ['leadership', 'mentorship', 'team management', 'professional development', 'feedback', 'coaching'],
  author = 'Jason House',
  type = 'website',
  image = '/custom-elements-house-logo-512.png',
  publishedTime,
  modifiedTime,
  tags,
  readingTime,
  canonical,
  noindex = false
}: SEOProps) {
  const router = useRouter();
  const baseUrl = 'https://jasonhhouse.github.io';
  const currentUrl = canonical || `${baseUrl}${router.asPath}`;
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  // Generate structured data based on page type
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'BlogPosting' : 'WebSite',
      name: title,
      description: description,
      url: currentUrl,
      author: {
        '@type': 'Person',
        name: author,
        url: baseUrl,
        sameAs: [
          'https://www.linkedin.com/in/jason-h-91181728/'
        ]
      },
      publisher: {
        '@type': 'Person',
        name: author,
        logo: {
          '@type': 'ImageObject',
          url: imageUrl,
          width: 512,
          height: 512
        }
      }
    };

    if (type === 'article') {
      return {
        ...baseData,
        '@type': 'BlogPosting',
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: imageUrl,
          width: 512,
          height: 512
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        keywords: keywords.join(', '),
        ...(tags && {
          about: tags.map(tag => ({
            '@type': 'Thing',
            name: tag
          }))
        }),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': currentUrl
        },
        ...(readingTime && {
          timeRequired: `PT${readingTime}M`
        })
      };
    }

    if (router.pathname === '/') {
      return {
        ...baseData,
        '@type': 'WebSite',
        name: 'Jason House - Leadership and Mentorship Blog',
        alternateName: 'Leadership Blog by Jason House',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/posts/?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      };
    }

    return baseData;
  };

  const structuredData = generateStructuredData();

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Jason House - Leadership Blog" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${title} - Jason House Leadership Blog`} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && tags && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@jasonhhouse" />
      <meta name="twitter:creator" content="@jasonhhouse" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${title} - Jason House Leadership Blog`} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2196f3" />
      <meta name="msapplication-TileColor" content="#2196f3" />
      <meta name="msapplication-TileImage" content="/custom-elements-house-logo-192.png" />

      {/* Favicons */}
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/custom-elements-house-logo-192.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="//www.linkedin.com" />
      <link rel="dns-prefetch" href="//github.com" />

      {/* RSS Feed */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Jason House - Leadership Blog RSS Feed"
        href={`${baseUrl}/rss.xml`}
      />

      {/* Reading time meta */}
      {readingTime && (
        <meta name="reading-time" content={`${readingTime} min read`} />
      )}
    </Head>
  );
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Helper function to extract meta description from content
export function generateMetaDescription(content: string, length: number = 160): string {
  const plainText = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  
  if (plainText.length <= length) return plainText;
  
  const truncated = plainText.substring(0, length);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}