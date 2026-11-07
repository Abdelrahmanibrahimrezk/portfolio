import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats from next/image; add remote hosts here if you load images from a CMS.
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
