/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ghost.org', 'static.ghost.org', 'railway.app'],
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore type errors
  },
}

module.exports = nextConfig
