/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['a.espncdn.com', 'resources.premierleague.com', 'img.uefa.com', 'cdn.sofifa.net'],
  },
  // Skip font optimization during build
  optimizeFonts: false,
}
module.exports = nextConfig
