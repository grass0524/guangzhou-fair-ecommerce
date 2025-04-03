/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // 如果需要外部图片域名，请在这里添加
  },
};

module.exports = nextConfig; 