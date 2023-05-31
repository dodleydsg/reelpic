/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";
import { config } from "bluebird";
const nextConfig = {
  reactStrictMode: false,
};

const config = {
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

export default withPlaiceholder(config);
