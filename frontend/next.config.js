/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
    ],
  },
};
