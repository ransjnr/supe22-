/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Sanity CDN — project image uploads
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default config;
