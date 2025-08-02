/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['simp6.selti-delivery.ru'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'simp6.selti-delivery.ru',
        port: '',
        pathname: '/images3/**',
      },
    ],
  },
}

export default nextConfig