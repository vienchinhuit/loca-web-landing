/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config) => {
  //   config.resolve = {
  //     ...config.resolve,
  //     fallback: {
  //       ...config.resolve.fallback,
  //       fs: false, // Nếu bạn gặp vấn đề về module không tìm thấy `fs`
  //     },
  //   };
  //   return config;
  // },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
