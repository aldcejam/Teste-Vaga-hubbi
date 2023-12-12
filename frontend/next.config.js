/** @type {import('next').NextConfig} */
const nextConfig = { 
    env: {
        BACKEND_API: process.env.BACKEND_API,
    },
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:5000/:path*',
          },
        ]
      },
    
    reactStrictMode: true,
    
}

module.exports = nextConfig
