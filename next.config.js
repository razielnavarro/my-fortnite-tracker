/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        // Rewrites all API requests to your Express server
        {
            source: "/api/:path*",
            destination: "http://localhost:3000/api/:path*",
          },
          
      ];
    },
  };
  
  module.exports = nextConfig;
  