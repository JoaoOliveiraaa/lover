/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: '/paraomeuamor', // Adicione isso para indicar a subpasta
    assetPrefix: '/paraomeuamor/', // Adicione isso para corrigir os caminhos dos assets
  }
  
  module.exports = nextConfig