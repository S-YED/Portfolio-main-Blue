const fs = require("fs");
const path = require("path");

// next-sitemap only discovers routes it can see in the build manifest, and
// /blog/[slug] is driven by folders under public/blogs. Without this, the
// sitemap ships with just "/" and "/blog" and no post is ever listed.
// Read with plain fs: this config is loaded as CommonJS by the next-sitemap
// CLI, so it cannot import app/utils/getBlogData.ts.
function blogPaths(config) {
  const blogsDir = path.join(process.cwd(), "public", "blogs");

  if (!fs.existsSync(blogsDir)) return [];

  return fs
    .readdirSync(blogsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      loc: `/blog/${entry.name}`,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }));
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true, // (optional)
    additionalPaths: async (config) => blogPaths(config),
    // ...other options
}
