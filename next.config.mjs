/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'tophomedev.runasp.net',
      },
      {
        protocol: 'http',
        hostname: 'tophomedev.runasp.net',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week
    dangerouslyAllowSVG: true,
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ]
  },

  // Enable source maps in development only
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',

  // Explicit Turbopack configuration
  turbopack: {
    root: './',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://tophomedev.runasp.net/api/:path*',
      },
      {
        source: '/images/:path*',
        destination: 'http://tophomedev.runasp.net/images/:path*',
      },
    ]
  },
}

export default nextConfig
