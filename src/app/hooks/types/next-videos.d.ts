declare module 'next-videos' {
  import { NextConfig } from 'next';

  function withVideos(nextConfig: NextConfig): NextConfig;

  export = withVideos;
}
