/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**', // This allows any path for firebase storage
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // This allows any path for Unsplash images
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // This allows any path for Cloudinary images
      },
    ],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */

// const nextConfig = {
// };

// export default nextConfig;