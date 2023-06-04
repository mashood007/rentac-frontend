/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    esmExternals: false
  },
  destination: 'http://localhost:3000/:path*',
}

module.exports = nextConfig
