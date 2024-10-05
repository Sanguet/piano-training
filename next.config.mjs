/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
    // Add downlevelIteration option
    downlevelIteration: true,
  },
};

export default nextConfig;
