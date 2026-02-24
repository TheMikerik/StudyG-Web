import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow react-markdown and remark/rehype ESM packages to be bundled
  transpilePackages: ["react-markdown", "remark-gfm", "rehype-highlight"],
};

export default nextConfig;
