import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
  },
  images: {
    domains: [],
  },
};

// Tambahkan domain Supabase jika ada di env
if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  const supabaseDomain = process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/^https?:\/\//, '');
  if (!nextConfig.images!.domains!.includes(supabaseDomain)) {
    nextConfig.images!.domains!.push(supabaseDomain);
  }
}

export default nextConfig;
