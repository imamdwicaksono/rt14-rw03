import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  const supabaseDomain = process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/^https?:\/\//, '');
  if (!nextConfig.images) nextConfig.images = {};
  if (!nextConfig.images.domains) nextConfig.images.domains = [];
  if (!nextConfig.images.domains.includes(supabaseDomain)) {
    nextConfig.images.domains.push(supabaseDomain);
  }
}

export default nextConfig;
