import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants/site'
import { getAllPostsMetadata } from '@/lib/mdx'
import { clientWorks, personalProjects } from '@/data/worksData'
import { supportArticles } from '@/data/supportArticles'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/service`,   changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/works`,     changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`,      changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/support`,   changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/about`,     changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`,   changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/estimate`,  changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/order`,     changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/links`,     changeFrequency: 'monthly', priority: 0.5 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = getAllPostsMetadata().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const workRoutes: MetadataRoute.Sitemap = [...clientWorks, ...personalProjects].map((work) => ({
    url: `${SITE_URL}/works/${work.id}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const supportRoutes: MetadataRoute.Sitemap = Object.keys(supportArticles).map((slug) => ({
    url: `${SITE_URL}/support/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...blogRoutes, ...workRoutes, ...supportRoutes]
}
