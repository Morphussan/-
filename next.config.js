/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/app/admin',
  assetPrefix: '/app/admin/',
  // Отключаем серверную генерацию для SPA
  typescript: {
    ignoreBuildErrors: true,
  },
  // Принудительно используем клиентский рендеринг
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig;
