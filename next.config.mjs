/** @type {import('next').NextConfig} */
const nextConfig = {
     eslint:{
      ignoreDuringBuilds:true
     },
  images: {
    remotePatterns: [
      {
        hostname: "pub-87db16391ed343619247bea2be86f8e6.r2.dev",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
