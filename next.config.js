/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  env: {
    IPFS_API_KEY: process.env.IPFS_API_KEY,
    IPFS_API_SECRET: process.env.IPFS_API_SECRET,
    IPFS_GATEWAY: process.env.IPFS_GATEWAY,
    
  }
}

module.exports = nextConfig
