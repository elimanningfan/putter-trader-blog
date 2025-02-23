/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ghost.org', 'static.ghost.org', 'railway.app', 'ghost-production-76af.up.railway.app'],
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore type errors
  },
}

export default nextConfig;
