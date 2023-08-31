/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/src/index.tsx',
        destination: 'https://trident-server.vercel.app/admin-updates',
      },
    ]
  },
}
