/** @type {import('next').NextConfig} */
const nextConfig = { 
    env: {
        BACKEND_API: process.env.BACKEND_API,
    },
    
    reactStrictMode: true,
    
}

module.exports = nextConfig