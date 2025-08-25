/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "usercontent.jamendo.com",
      },
    ],
  },
};

export default nextConfig;
