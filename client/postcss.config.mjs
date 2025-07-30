/** @type {import('next').NextConfig} */
const nextConfig = {
  // This block is required for Node.js runtime in middleware on Next.js 15+
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;