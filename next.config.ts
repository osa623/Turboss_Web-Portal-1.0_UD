// types/next-videos.d.ts
declare module 'next-videos' {
    import { NextConfig } from 'next';
  
    function withVideos(nextConfig: NextConfig): NextConfig;
  
    export = withVideos;
  }
  