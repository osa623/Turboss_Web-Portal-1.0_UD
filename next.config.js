/** @type {import('next').NextConfig} */
// Keep this file as your main Next.js configuration

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
