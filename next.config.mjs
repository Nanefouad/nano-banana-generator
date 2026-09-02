/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;

